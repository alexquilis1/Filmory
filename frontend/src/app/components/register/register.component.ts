import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

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
  usernameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  constructor(private authService: AuthService) {}

  onRegister(): void {
    // Reset previous error messages
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    if (!this.username) {
      this.usernameError = 'Username is required.';
    }

    if (!this.isValidEmail(this.email)) {
      this.emailError = 'Please provide a valid email.';
    }

    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long.';
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match.';
    }

    if (this.usernameError || this.emailError || this.passwordError || this.confirmPasswordError) {
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.error = '';
        this.success = 'Registration successful! You can now log in.';
      },
      error: (err) => {
        if (err.error.message === 'Email already in use') {
          this.emailError = 'This email is already registered.';
        } else {
          this.error = err.error.message || 'An error occurred during registration.';
        }
        this.success = '';
      }
    });
  }

  // Helper function to validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
