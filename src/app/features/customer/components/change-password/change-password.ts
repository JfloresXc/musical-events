import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [
    MatCardModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  formGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.formGroup.invalid) {
      this.snackBar.open('Formulario inválido', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    const newPassword = this.formGroup.get('newPassword')?.value ?? '';
    const confirmPassword = this.formGroup.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }

    const oldPassword = this.formGroup.get('currentPassword')?.value ?? '';
    this.authService
      .changePassword({
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .subscribe({
        next: () => {
          this.snackBar.open('Contraseña cambiada exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.title, 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }
}
