import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './form-register.html',
  styleUrl: './form-register.css',
})
export class FormRegister {

  // ── Campos ──
  username = '';
  email    = '';
  password = '';
  confirm  = '';

  // ── UI ──
  step     = 1;
  focused  = '';
  showPwd  = false;
  showConf = false;
  loading  = false;
  errorMsg = '';
  success  = false;

  // ── Fuerza de contraseña ──
  strengthScore = 0;
  strengthLabel = '';
  strengthColor = '';

  // ── Coincidencia ──
  passwordsMatch = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ─────────────────────────────────────────
  // Validación de contraseña (reglas del backend)
  // Mínimo 8 chars, 1 mayúscula, 1 minúscula, 1 número, 1 especial (@$!%*?&)
  // ─────────────────────────────────────────

  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  isPasswordValid(): boolean {
    return this.passwordRegex.test(this.password);
  }

  // ─────────────────────────────────────────
  // Navegación entre pasos
  // ─────────────────────────────────────────

  goStep2(): void {
    this.errorMsg = '';

    if (!this.email.trim()) {
      this.errorMsg = 'El correo electrónico es requerido.';
      return;
    }
    if (!this.email.includes('@')) {
      this.errorMsg = 'Ingresa un correo electrónico válido.';
      return;
    }
    if (!this.username.trim()) {
      this.errorMsg = 'El nombre de usuario es requerido.';
      return;
    }

    this.step = 2;
  }

  goBack(): void {
    this.step     = 1;
    this.errorMsg = '';
    this.success  = false;
  }

  // ─────────────────────────────────────────
  // Validaciones en tiempo real
  // ─────────────────────────────────────────

  checkStrength(): void {
    const p = this.password;
    let score = 0;

    if (p.length >= 8)              score++;
    if (/[A-Z]/.test(p))            score++;
    if (/[0-9]/.test(p))            score++;
    if (/[^A-Za-z0-9]/.test(p))     score++;

    const labels = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'];
    const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];

    this.strengthScore = score;
    this.strengthLabel = labels[score] ?? '';
    this.strengthColor = colors[score] ?? '';

    this.checkMatch();
  }

  checkMatch(): void {
    this.passwordsMatch =
      this.password.length > 0 &&
      this.password === this.confirm;
  }

  // ─────────────────────────────────────────
  // Envío del formulario
  // ─────────────────────────────────────────

  doSubmit(): void {
    this.errorMsg = '';

    if (!this.isPasswordValid()) {
      this.errorMsg = 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).';
      return;
    }
    if (this.password !== this.confirm) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;

    this.authService.register({
      username: this.username,
      email:    this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = true;
        this.authService.saveSession(res);
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 409) {
          this.errorMsg = 'El correo ya está registrado.';
        } else if (err.status === 400) {
          this.errorMsg = 'Datos inválidos. Revisa los campos e intenta de nuevo.';
        } else if (err.status === 0) {
          this.errorMsg = 'No se pudo conectar con el servidor.';
        } else {
          this.errorMsg = 'Ocurrió un error. Intenta de nuevo.';
        }
      }
    });
  }
}