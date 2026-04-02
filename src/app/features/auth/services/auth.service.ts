import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../interfaces/LoginResponse';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  http = inject(HttpClient);
  router = inject(Router);
  readonly isLoggedIn = signal<boolean>(localStorage.getItem('token') !== null);

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
}
