import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private authService: AuthService) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.error = '';
        this.success = 'Registration successful! You can now log in.';
      },
      error: (err) => {
        this.error = err.error.message || 'An error occurred during registration. ';
        this.success = '';
      }
    });
  }
}
