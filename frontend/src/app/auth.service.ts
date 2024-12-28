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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  register(username: string, email: string, password: string): Observable<any> {
    console.log('Registering user:', username, email);
    return this.http.post(`${this.baseUrl}/signup`, { username, email, password });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response.token && response.userId && response.email && response.username) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.userId.toString());
          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.username)
          console.log('Logged in with userId:', response.userId, 'and email:', response.email);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    console.log('Logged out, token and email removed from localStorage');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserId(): number {
    const user_id = localStorage.getItem('user_id');
    console.log('The user id is: ', user_id);

    if (user_id === null) {
      throw new Error('User ID not found in localStorage');
    }

    const parsedUserId = parseInt(user_id);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid user ID in localStorage');
    }

    return parsedUserId;
  }


}
