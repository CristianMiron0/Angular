import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', redirectTo: '/home', pathMatch: 'full' 
  },
  { 
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  { 
    path: 'user/:id',
    loadComponent: () => import('./user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  { 
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: '**', redirectTo: '/home' 
  },
  { 
  path: 'tasks', 
  loadComponent: () => import('./task-manager/task-manager.component').then(m => m.TaskManagerComponent) 
  }
];