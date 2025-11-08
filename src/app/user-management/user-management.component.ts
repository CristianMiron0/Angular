import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management">
      <h2>Gestión de Usuarios (API)</h2>

      <!-- Estado de carga y error -->
      @if (userService.loading()) {
        <div class="loading">Cargando usuarios...</div>
      }
      @if (userService.error()) {
        <div class="error">
          Error: {{ userService.error() }}
          <button (click)="userService.loadUsers()">Reintentar</button>
        </div>
      }

      <!-- Formulario para agregar usuario -->
      <div class="user-form">
        <h3>Agregar Nuevo Usuario</h3>
        <input
          type="text"
          [(ngModel)]="newUserName"
          placeholder="Nombre"
          [disabled]="userService.loading()"
        >
        <input
          type="email"
          [(ngModel)]="newUserEmail"
          placeholder="Email"
          [disabled]="userService.loading()"
        >
        <button
          (click)="addUser()"
          [disabled]="!newUserName || !newUserEmail || userService.loading()"
        >
          {{ userService.loading() ? 'Agregando...' : 'Agregar Usuario' }}
        </button>
      </div>

      <!-- Lista de usuarios -->
      <div class="user-list">
        @for (user of userService.users(); track user.id) {
          <div class="user-item" [class.active]="user.active">
            <div class="user-info">
              <h4>{{ user.name }}</h4>
              <p>{{ user.email }}</p>
              <span class="status" [class.active]="user.active">
                {{ user.active ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
            <div class="user-actions">
              <button
                (click)="toggleUserStatus(user.id, !user.active)"
                [disabled]="userService.loading()"
              >
                {{ user.active ? 'Desactivar' : 'Activar' }}
              </button>
              <button
                (click)="deleteUser(user.id)"
                class="delete"
                [disabled]="userService.loading()"
              >
                Eliminar
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .user-management { padding: 1rem; max-width: 800px; margin: 0 auto; }
    .loading { background: #2196F3; color: white; padding: 1rem; margin: 1rem 0; text-align: center; }
    .error { background: #f44336; color: white; padding: 1rem; margin: 1rem 0; }
    .user-form { background: #f5f5f5; padding: 1rem; margin: 1rem 0; border-radius: 4px; }
    input, button { margin: 0.5rem; padding: 0.5rem; }
    .user-list { display: flex; flex-direction: column; gap: 1rem; }
    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #ddd;
      margin: 0.5rem 0;
      border-radius: 4px;
    }
    .user-item.active { border-left: 4px solid #4CAF50; }
    .status { padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem; }
    .status.active { background: #4CAF50; color: white; }
    .status:not(.active) { background: #f44336; color: white; }
    .user-actions button { margin: 0 0.2rem; }
    .delete { background: #dc3545; color: white; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class UserManagementComponent {
  newUserName = '';
  newUserEmail = '';

  constructor(public userService: UserService) {}

  async addUser() {
    if (this.newUserName && this.newUserEmail) {
      const newUser = await this.userService.createUser({
        name: this.newUserName,
        email: this.newUserEmail,
        active: true
      });
      
      if (newUser) {
        this.newUserName = '';
        this.newUserEmail = '';
      }
    }
  }

  async toggleUserStatus(userId: number, active: boolean) {
    await this.userService.updateUser(userId, { active });
  }

  async deleteUser(userId: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      await this.userService.deleteUser(userId);
    }
  }
}