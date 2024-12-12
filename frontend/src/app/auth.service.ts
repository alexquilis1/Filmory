// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from './models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  // Checks if the user is logged in (by checking if the token is available)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Returns true if the token is present
  }

  // Register method
  register(username: string, email: string, password: string): Observable<any> {
    console.log('Registering user:', username, email);
    return this.http.post(`${this.baseUrl}/signup`, { username, email, password });
  }

  // Login method with typed response
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        // Ensure the response contains token, userId, and email
        if (response.token && response.user_id && response.email) {
          localStorage.setItem('token', response.token);  // Save the token
          localStorage.setItem('user_id', response.user_id.toString());  // Save the userId
          localStorage.setItem('email', response.email);  // Save the email
          console.log('Logged in with userId:', response.user_id, 'and email:', response.email);
        }
      })
    );
  }

  // Clears the token and email from localStorage and logs the user out
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');  // Also clear userId
    console.log('Logged out, token and email removed from localStorage');
  }

  getToken(): string {
    return localStorage.getItem('token') || ''; // Devuelve una cadena vacía si no hay token
  }

  // Get the stored user ID from localStorage
  getUserId(): number {
    const user_id = localStorage.getItem('user_id');
    console.log('The user id is: ', user_id);

    // Ensure user_id is present and valid, otherwise throw an error
    if (user_id === null) {
      throw new Error('User ID not found in localStorage');
    }

    // Parse and return the user ID
    const parsedUserId = parseInt(user_id);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid user ID in localStorage');
    }

    return parsedUserId;  // Return the parsed user ID
  }

}
