import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LoaderComponent } from './loader.component';
import { WelcomeComponent } from './welcome.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent, WelcomeComponent],
  template: `
    <div class="login-container">
      <form class="login-form" (ngSubmit)="login()" autocomplete="off" *ngIf="!showLoader && !showWelcome">
        <h2>Iniciar Sesión</h2>
        <div class="input-group">
          <label for="email">Usuario</label>
          <input id="email" type="email" [(ngModel)]="email" name="email" required autocomplete="username" />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input id="password" type="password" [(ngModel)]="password" name="password" required autocomplete="current-password" />
        </div>
        <button type="submit" [disabled]="loading">Entrar</button>
        <div class="error" *ngIf="error">{{ error }}</div>
      </form>
      <app-loader *ngIf="showLoader" text="Cargando..." />
      <app-welcome *ngIf="showWelcome" [name]="'Jenny'" />
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #232526 0%, #414345 100%);
    }
    .login-form {
      background: #18191a;
      padding: 2.5rem 2rem;
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
      min-width: 320px;
      max-width: 90vw;
      color: #fff;
      gap: 1.2rem;
      animation: fadeIn 0.7s;
    }
    .login-form h2 {
      margin: 0 0 1.2rem 0;
      font-weight: 700;
      font-size: 2rem;
      letter-spacing: 1px;
      text-align: center;
      color: #7b5cff;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .input-group label {
      font-size: 1rem;
      color: #bdbdbd;
      font-weight: 500;
    }
    .input-group input {
      padding: 0.7rem 1rem;
      border-radius: 8px;
      border: none;
      background: #232526;
      color: #fff;
      font-size: 1rem;
      outline: none;
      transition: box-shadow 0.2s;
      box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    }
    .input-group input:focus {
      box-shadow: 0 0 0 2px #7b5cff44;
    }
    button[type="submit"] {
      margin-top: 1rem;
      padding: 0.8rem 0;
      border-radius: 8px;
      border: none;
      background: linear-gradient(90deg, #7b5cff 0%, #5e8bff 100%);
      color: #fff;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(123,92,255,0.08);
    }
    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .error {
      color: #ff5252;
      font-size: 0.95rem;
      text-align: center;
      margin-top: 0.5rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: none; }
    }
    @media (max-width: 480px) {
      .login-form {
        min-width: 90vw;
        padding: 1.5rem 0.5rem;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';
  showLoader = false;
  showWelcome = false;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  login() {
    this.error = '';
    this.loading = true;
    setTimeout(() => {
      if (this.auth.login(this.email, this.password)) {
        this.showLoader = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.showLoader = false;
          this.showWelcome = true;
          this.cdr.detectChanges();
          setTimeout(() => {
            this.showWelcome = false;
            this.cdr.detectChanges();
            this.router.navigate(['/dashboard']);
          }, 1500);
        }, 2000);
      } else {
        this.error = 'Usuario o contraseña incorrectos';
        this.loading = false;
      }
    }, 1000);
  }
} 