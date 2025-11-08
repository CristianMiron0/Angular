import { Injectable, signal } from '@angular/core';

export interface MenuItem {
  label: string;
  path: string;
  protected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  menuItems = signal<MenuItem[]>([
    { label: 'Inicio', path: '/home', protected: false },
    { label: 'Acerca de', path: '/about', protected: false },
    { label: 'Contacto', path: '/contact', protected: false },
    { label: 'Usuarios', path: '/user-list', protected: false },
    { label: 'Dashboard', path: '/dashboard', protected: true },
    { label: 'Tareas', path: '/tasks', protected: true }
  ]);

  isLoggedIn = signal(false);

  constructor() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    this.isLoggedIn.set(isAuth);
  }

  login() {
    localStorage.setItem('isAuthenticated', 'true');
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.isLoggedIn.set(false);
  }
}