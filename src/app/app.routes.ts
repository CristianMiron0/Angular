import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full' 
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
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  { 
    path: 'user/:id',
    loadComponent: () => import('./user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  { 
    path: 'user-list',
    loadComponent: () => import('./user-list/user-list.component').then(m => m.UserListComponent)
  },
  { 
    path: 'user-management',
    loadComponent: () => import('./user-management/user-management.component').then(m => m.UserManagementComponent)
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
    path: 'tasks', 
    loadComponent: () => import('./task-manager/task-manager.component').then(m => m.TaskManagerComponent),
    canActivate: [authGuard]
  },
  { 
    path: '**', 
    redirectTo: '/home' 
  }
];