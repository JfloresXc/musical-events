import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatCard, MatCardContent, MatFormField, MatLabel, MatInput, MatButton, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  emailModel = model<string>('jfloresxc@gmail.com');
  passwordModel = model<string>('jfloresxc');
  authService = inject(AuthService);

  async login() {
    await this.authService.login({
      email: this.emailModel(),
      password: this.passwordModel(),
    });
  }
}
