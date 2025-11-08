import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <h1>Acerca de Esta Aplicación</h1>
      
      <div class="about-content">
        <section class="about-section">
          <h2>🚀 Tecnologías Utilizadas</h2>
          <ul>
            <li>Angular 18 con arquitectura standalone</li>
            <li>Angular Material para componentes UI</li>
            <li>Signals para manejo de estado reactivo</li>
            <li>HttpClient para consumo de APIs REST</li>
            <li>Router con lazy loading</li>
            <li>Guards para protección de rutas</li>
          </ul>
        </section>
        
        <section class="about-section">
          <h2>✨ Características</h2>
          <ul>
            <li>Gestión completa de tareas (CRUD)</li>
            <li>Sistema de usuarios con API REST</li>
            <li>Dashboard con estadísticas</li>
            <li>Formularios reactivos</li>
            <li>Autenticación y autorización</li>
            <li>Diseño responsive</li>
          </ul>
        </section>
        
        <section class="about-section">
          <h2>📝 Descripción</h2>
          <p>
            Esta es una aplicación de demostración que muestra las mejores prácticas
            de Angular 18, incluyendo componentes standalone, signals, y una arquitectura
            moderna y escalable.
          </p>
          <p>
            La aplicación utiliza json-server como backend simulado para demostrar
            operaciones CRUD completas con una API REST.
          </p>
        </section>
        
        <section class="about-section">
          <h2>👨‍💻 Desarrollo</h2>
          <p>
            Desarrollado con Angular CLI versión 18.x.
          </p>
          <p>
            Para ejecutar el proyecto localmente:
          </p>
          <pre><code>npm install
npm start
json-server --watch db.json --port 3000</code></pre>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    h1 {
      text-align: center;
      color: #1976d2;
      margin-bottom: 2rem;
    }
    
    .about-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .about-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .about-section h2 {
      color: #1976d2;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    
    .about-section ul {
      list-style-position: inside;
      color: #666;
      line-height: 2;
    }
    
    .about-section li {
      margin-bottom: 0.5rem;
    }
    
    .about-section p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 1rem;
    }
    
    pre {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
    
    code {
      font-family: 'Courier New', monospace;
      color: #d32f2f;
    }
  `]
})
export class AboutComponent { }