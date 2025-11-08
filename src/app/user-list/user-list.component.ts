import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-management">
      <h2>Gestión de Usuarios</h2>

      <div class="add-user">
        <input
          type="text"
          [(ngModel)]="newUserName"
          placeholder="Nombre de usuario"
        >
        <input
          type="text"
          [(ngModel)]="newUserEmail"
          placeholder="Email"
        >
        <button (click)="addUser()">Agregar Usuario</button>
      </div>

      <div class="filter">
        <label>
          <input type="checkbox" [(ngModel)]="showOnlyActive">
          Filtrar usuarios activos
        </label>
      </div>

      @if (users().length === 0) {
        <p class="no-users">No hay usuarios registrados</p>
      } @else {
        <div class="user-stats">
          <p>Total usuarios: {{ users().length }}</p>
          <p>Usuarios activos: {{ activeUsersCount() }}</p>
        </div>
      }

      <div class="user-list">
        @for (user of filteredUsers(); track user.id) {
          <div class="user-card" [class.active]="user.active">
            <h3 [style.color]="user.active ? 'green' : 'gray'">
              {{ user.name }}
            </h3>
            <p>Email: {{ user.email }}</p>
            <p>Estado: 
              <span [class.status-active]="user.active"
                    [class.status-inactive]="!user.active">
                {{ user.active ? 'Active' : 'Inactive' }}
              </span>
            </p>
            <button (click)="toggleUserStatus(user.id)">
              {{ user.active ? 'Desactivar' : 'Activar' }}
            </button>
            <button (click)="removeUser(user.id)" class="delete-btn">
              Eliminar
            </button>
          </div>
        } @empty {
          <p class="no-users">No hay usuarios que mostrar</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .user-management { padding: 1rem; }
    .add-user, .filter { margin: 1rem 0; padding: 1rem; background: #f9f9f9; }
    input, button { margin: 0.5rem; padding: 0.5rem; }
    .user-list { display: grid; gap: 1rem; }
    .user-card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .user-card.active { border-left: 4px solid green; }
    .status-active { color: green; font-weight: bold; }
    .status-inactive { color: red; }
    .delete-btn { background-color: #dc3545; color: white; }
    .no-users { text-align: center; color: #666; font-style: italic; }
  `]
})
export class UserListComponent {
  users = signal<User[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', active: true },
    { id: 2, name: 'Carla User', email: 'carla@email.com', active: false },
    { id: 3, name: 'Maria Rodriguez', email: 'maria@email.com', active: true }
  ]);

  newUserName = '';
  newUserEmail = '';
  showOnlyActive = false;

  activeUsersCount = computed(() => 
    this.users().filter(user => user.active).length
  );

  filteredUsers = computed(() => {
    if (this.showOnlyActive) {
      return this.users().filter(user => user.active);
    }
    return this.users();
  });

  addUser() {
    if (this.newUserName && this.newUserEmail) {
      const newUser: User = {
        id: Date.now(),
        name: this.newUserName,
        email: this.newUserEmail,
        active: true
      };
      this.users.update(currentUsers => [...currentUsers, newUser]);
      this.newUserName = '';
      this.newUserEmail = '';
    }
  }

  toggleUserStatus(userId: number) {
    this.users.update(users =>
      users.map(user =>
        user.id === userId ? { ...user, active: !user.active } : user
      )
    );
  }

  removeUser(userId: number) {
    this.users.update(users => users.filter(user => user.id !== userId));
  }
}