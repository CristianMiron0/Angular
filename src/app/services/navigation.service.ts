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
    { label: 'Dashboard', path: '/dashboard', protected: true }
  ]);

  isLoggedIn = signal(false);

  constructor() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.isLoggedIn.set(localStorage.getItem('isLoggedIn') === 'true');
  }

  login() {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn.set(false);
  }
}