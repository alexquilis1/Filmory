// src/app/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginResponse } from '../../models/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        console.log('Full response', response)
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());

        console.log('Logged in with email:', response.email);
        console.log('Logged in with userId:', response.userId);

        this.error = '';  // Clear previous error messages
        this.success = 'Login successful!';
      },
      error: (err: { error: { message: string } }) => {
        this.success = '';  // Clear success message if error occurs
        this.error = err.error.message || 'Invalid credentials.';
      }
    });
  }
}
