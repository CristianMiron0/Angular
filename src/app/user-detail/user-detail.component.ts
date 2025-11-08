import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-detail">
      @if (loading()) {
        <p>Cargando Usuario...</p>
      } @else if(user()) {
        <div class="user-card">
          <h2>Detalles del Usuario</h2>
          <p><strong>ID:</strong> {{ user()?.id }}</p>
          <p><strong>Nombre:</strong> {{ user()?.name }}</p>
          <p><strong>Email:</strong> {{ user()?.email }}</p>
          <p><strong>Teléfono:</strong> {{ user()?.phone }}</p>
          <p><strong>Sitio Web:</strong> {{ user()?.website }}</p>

          <div class="actions">
            <button (click)="goBack()">Volver</button>
            <a [routerLink]="['/user', user()!.id + 1]">Siguente Usuario</a>
          </div>
        </div>
      } @else {
        <p>Usuario no encontrado</p>
      }
    </div>
  `,
  styles: [`
    .user-detail { padding: 2rem;}
    .user-card {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      boarder: 1px solid #ddd;
      border-radius: 8px;
    }
    .actions { margin-top: 1rem; display: flex; justify-content: space-between; }
    `]
})
export class UserDetailComponent implements OnInit{
  user = signal<User | null>(null);
  loading = signal(true);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = parseInt(params.get('id')!);
      this.loadUser(userId);
    });
  }

  async loadUser(id: number) {
    this.loading.set(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUsers: User[] = [
      { id: 1, name: 'Leanne Graham', email: 'leanne@email.com', phone: '1-770-736-8031', website: 'hildegard.org.com' },
      { id: 2, name: 'Ervin Howell', email: 'ervin@rmail.com', phone: '010-692-6593', website: 'anastasia.net' },
      { id: 3, name: 'Clementine Bauch', email: 'clementine@email.com', phone: '1-463-123-4447', website: 'ramiro.info' }
    ];

    const user = mockUsers.find(u => u.id === id) || null;
    this.user.set(user);
    this.loading.set(false);
  }

  goBack() {
    window.history.back();
  }
}
