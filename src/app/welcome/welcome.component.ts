import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <h1>Bienvenido a Angular 18</h1>
      <p>Fecha actual: {{ currentDate | date:'fullDate' }}</p>
      <button (click)="showMessage()">{{ messageVisible ? 'Ocultar' : 'Mostrar' }} mensaje</button>
      <p *ngIf="messageVisible">{{ welcomeMessage }}</p>
    </div>
  `,
  styles: [`
    .welcome-container {
      text-align: center;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      margin: 20px;
    }
    button {
      padding: 10px 20px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class WelcomeComponent {
  currentDate = new Date();
  messageVisible = false;
  welcomeMessage = '¡Has activado tu primer componente Angular!';

  showMessage() {
    this.messageVisible = !this.messageVisible;
  }
}