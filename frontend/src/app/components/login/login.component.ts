// src/app/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LoginResponse } from '../../models/login-response.model';  // Import LoginResponse

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
      next: (response: LoginResponse) => {  // Use LoginResponse type here
        // Save the token, userId, and email in localStorage
        console.log('Full response', response)
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id.toString());  // Save userId
        localStorage.setItem('email', response.email);  // Save email if needed

        console.log('Logged in with email:', response.email);
        console.log('Logged in with userId:', response.user_id);

        this.error = '';  // Clear previous error messages
        this.success = 'Login successful!';  // Set success message
      },
      error: (err: { error: { message: string } }) => {
        this.success = '';  // Clear success message if error occurs
        this.error = err.error.message || 'Invalid credentials.';  // Set error message
      }
    });
  }
}
