import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule
  ],
  template: `
    <div class="contact-container">
      <mat-card class="contact-card">
        <mat-card-header>
          <mat-card-title>Formulario de Contacto</mat-card-title>
          <mat-card-subtitle>Utiliza Angular Material para un diseño moderno</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form class="contact-form" #contactForm="ngForm">
            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Nombre completo</mat-label>
                <input
                  matInput
                  [(ngModel)]="contactData.name"
                  name="name"
                  required
                  placeholder="Ingresa tu nombre"
                >
                <mat-icon matSuffix>person</mat-icon>
                <mat-hint>Mínimo 3 caracteres</mat-hint>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Email</mat-label>
                <input
                  matInput
                  type="email"
                  [(ngModel)]="contactData.email"
                  name="email"
                  required
                  placeholder="ejemplo@email.com"
                >
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Asunto</mat-label>
                <mat-select [(ngModel)]="contactData.subject" name="subject" required>
                  <mat-option value="soporte">Soporte Técnico</mat-option>
                  <mat-option value="ventas">Consultas de Ventas</mat-option>
                  <mat-option value="general">Información General</mat-option>
                  <mat-option value="otros">Otros</mat-option>
                </mat-select>
                <mat-icon matSuffix>subject</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="form-field">
                <mat-label>Teléfono</mat-label>
                <input
                  matInput
                  type="tel"
                  [(ngModel)]="contactData.phone"
                  name="phone"
                  placeholder="+34 123 456 789"
                >
                <mat-icon matSuffix>phone</mat-icon>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mensaje</mat-label>
              <textarea
                matInput
                [(ngModel)]="contactData.message"
                name="message"
                required
                rows="4"
                placeholder="Describe tu consulta en detalle..."
              ></textarea>
            </mat-form-field>

            <div class="form-actions">
              <mat-checkbox [(ngModel)]="contactData.newsletter" name="newsletter">
                Suscribirme al newsletter
              </mat-checkbox>
              
              <div class="buttons">
                <button
                  mat-stroked-button
                  type="button"
                  (click)="resetForm(contactForm)"
                  [disabled]="sending"
                >
                  <mat-icon>refresh</mat-icon>
                  Limpiar
                </button>
                
                <button
                  mat-raised-button
                  color="primary"
                  type="button"
                  (click)="submitForm()"
                  [disabled]="!contactForm.valid || sending"
                >
                  <mat-icon>{{ sending ? 'hourglass_empty' : 'send' }}</mat-icon>
                  {{ sending ? 'Enviando...' : 'Enviar Mensaje' }}
                </button>
              </div>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .contact-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
    }
    .contact-card {
      width: 100%;
      max-width: 800px;
    }
    .contact-form {
      padding: 1rem 0;
    }
    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .form-field, .full-width {
      flex: 1;
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
    .buttons {
      display: flex;
      gap: 1rem;
    }
    @media (max-width: 768px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }
      .form-actions {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
    newsletter: false
  };
  
  sending = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async submitForm() {
    this.sending = true;
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.sending = false;
    
    this.snackBar.open('Mensaje enviado correctamente', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
    
    this.resetForm();
  }

  resetForm(form?: any) {
    this.contactData = {
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
      newsletter: false
    };
    if (form) {
      form.reset();
    }
  }
}