// models/login-response.model.ts

export interface LoginResponse {
  user_id: number;
  token: string;
  email: string;  // Add the email field here
}
