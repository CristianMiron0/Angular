import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Bienvenido a Mi Aplicación Angular</h1>
      <p>Esta es la página principal de tu aplicación.</p>
      
      <div class="features">
        <div class="feature-card">
          <h3>📋 Gestión de Tareas</h3>
          <p>Administra tus tareas con un sistema completo de categorías y prioridades.</p>
          <a [routerLink]="['/tasks']">Ir a Tareas</a>
        </div>
        
        <div class="feature-card">
          <h3>👥 Gestión de Usuarios</h3>
          <p>Administra usuarios con operaciones CRUD completas.</p>
          <a [routerLink]="['/user-management']">Ver Usuarios</a>
        </div>
        
        <div class="feature-card">
          <h3>📊 Dashboard</h3>
          <p>Visualiza estadísticas y métricas importantes.</p>
          <a [routerLink]="['/dashboard']">Ver Dashboard</a>
        </div>
        
        <div class="feature-card">
          <h3>📧 Contacto</h3>
          <p>Formulario de contacto con Angular Material.</p>
          <a [routerLink]="['/contact']">Contactar</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    h1 {
      text-align: center;
      color: #1976d2;
      margin-bottom: 1rem;
    }
    
    > p {
      text-align: center;
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 3rem;
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .feature-card h3 {
      color: #1976d2;
      margin-bottom: 1rem;
    }
    
    .feature-card p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
    
    .feature-card a {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .feature-card a:hover {
      background-color: #1565c0;
    }
  `]
})
export class HomeComponent { }