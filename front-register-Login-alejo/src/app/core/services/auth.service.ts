import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// ── Requests ──
export interface LoginRequest {
  email:    string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email:    string;
  password: string;
}

// ── Response (igual para login y register) ──
export interface AuthResponse {
  token:    string;
  username: string;
  email:    string;
  userId:   number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.authUrl;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.api}/login`, data);
  }

  register(data: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.api}/register`, data);
  }

  // Guarda el token en localStorage para usarlo en peticiones futuras
  saveSession(response: AuthResponse): void {
    localStorage.setItem('token',    response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email',    response.email);
    localStorage.setItem('userId',   String(response.userId));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}