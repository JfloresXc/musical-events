import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../interfaces/LoginResponse';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  http = inject(HttpClient);
  router = inject(Router);
  readonly isLoggedIn = signal<boolean>(localStorage.getItem('token') !== null);
  readonly token = signal<string>(localStorage.getItem('token') ?? '');
  nameOfUser = signal<string>('');
  role = signal<string>('');
  isAdmin = computed(() => this.role() === 'Administrator');

  constructor() {
    this.decodeToken();
  }

  async login({ email, password }: { email: string; password: string }) {
    await lastValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}Users/login`, { username: email, password }),
    )
      .then((response) => {
        if (response.token) {
          this.saveToken(response.token);
          this.router.navigate(['/']);
          this.isLoggedIn.set(true);
        }
      })
      .catch((error) => error.error.title);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: Record<string, string> = jwtDecode(token);
      const nameOfUser =
        decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? '';
      this.nameOfUser.set(nameOfUser);

      const role =
        decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? '';
      this.role.set(role);
    }
  }

  changePassword({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
    return this.http.post(
      `${this.baseUrl}Users/change-password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token()}`,
        },
      },
    );
  }
}
