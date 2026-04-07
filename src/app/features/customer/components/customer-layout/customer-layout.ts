import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterOutlet, MatAnchor, RouterLinkActive, MatCard, MatCardContent, RouterLink],
  templateUrl: './customer-layout.html',
  styleUrl: './customer-layout.css',
})
export class CustomerLayout {
  private authService = inject(AuthService);
  readonly isAdmin = this.authService.isAdmin;
}
