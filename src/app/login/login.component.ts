import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Iniciar Sesión</h1>
        <p class="subtitle">Accede a tu cuenta</p>
        
        <form class="login-form" #loginForm="ngForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              required
              placeholder="Ingresa tu usuario"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              required
              placeholder="Ingresa tu contraseña"
            >
          </div>
          
          @if (errorMessage()) {
            <div class="error-message">
              {{ errorMessage() }}
            </div>
          }
          
          <button 
            type="submit" 
            class="login-button"
            [disabled]="!loginForm.valid || loading()"
          >
            {{ loading() ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </form>
        
        <div class="demo-info">
          <p><strong>Demo:</strong> Usuario: <code>admin</code> / Contraseña: <code>admin</code></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 120px);
      padding: 2rem;
    }
    
    .login-card {
      background: white;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    
    h1 {
      text-align: center;
      color: #1976d2;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }
    
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    label {
      font-weight: 500;
      color: #333;
    }
    
    input {
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    input:focus {
      outline: none;
      border-color: #1976d2;
    }
    
    input:invalid:not(:placeholder-shown) {
      border-color: #f44336;
    }
    
    .error-message {
      padding: 0.75rem;
      background-color: #ffebee;
      color: #c62828;
      border-radius: 4px;
      text-align: center;
      font-size: 0.9rem;
    }
    
    .login-button {
      padding: 0.75rem;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .login-button:hover:not(:disabled) {
      background-color: #1565c0;
    }
    
    .login-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .demo-info {
      margin-top: 2rem;
      padding: 1rem;
      background-color: #e3f2fd;
      border-radius: 4px;
      text-align: center;
    }
    
    .demo-info p {
      margin: 0;
      color: #1976d2;
      font-size: 0.9rem;
    }
    
    code {
      background-color: rgba(0,0,0,0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private navService: NavigationService,
    private router: Router
  ) {}

  async onLogin() {
    this.loading.set(true);
    this.errorMessage.set('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple validation (in real app, validate against backend)
    if (this.username === 'admin' && this.password === 'admin') {
      this.navService.login();
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage.set('Usuario o contraseña incorrectos');
    }

    this.loading.set(false);
  }
}