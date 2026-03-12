import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // ── Campos ──
  email    = '';
  password = '';

  // ── UI ──
  focused  = '';
  showPwd  = false;
  loading  = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  doLogin(): void {
    this.errorMsg = '';

    if (!this.email.trim()) {
      this.errorMsg = 'El correo electrónico es requerido.';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMsg = 'Ingresa un correo electrónico válido.';
      return;
    }
    if (!this.password) {
      this.errorMsg = 'La contraseña es requerida.';
      return;
    }

    this.loading = true;

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.authService.saveSession(res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 401) {
            this.errorMsg = 'Correo o contraseña incorrectos.';
          } else if (err.status === 400) {
            this.errorMsg = 'Datos inválidos. Verifica tu correo y contraseña.';
          } else if (err.status === 0) {
            this.errorMsg = 'No se pudo conectar con el servidor.';
          } else {
            this.errorMsg = 'Ocurrió un error. Intenta de nuevo.';
          }
        }
      });
  }
}