import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Servicios y modelos
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="task-manager">
      <!-- Header -->
      <mat-card class="header-card">
        <div class="header-content">
          <div class="header-info">
            <h1>TaskMaster</h1>
            <p>Gestiona tus tareas de forma eficiente</p>
          </div>
          <div class="header-stats">
            <div class="stat">
              <span class="stat-number">{{ stats().total }}</span>
              <span class="stat-label">Total</span>
            </div>
            <div class="stat">
              <span class="stat-number completed">{{ stats().completed }}</span>
              <span class="stat-label">Completadas</span>
            </div>
            <div class="stat">
              <span class="stat-number pending">{{ stats().pending }}</span>
              <span class="stat-label">Pendientes</span>
            </div>
          </div>
        </div>
      </mat-card>

      <div class="manager-content">
        <!-- Formulario de nueva tarea -->
        <mat-card class="form-card">
          <mat-card-header>
            <mat-card-title>Nueva Tarea</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form class="task-form" #taskForm="ngForm">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Título</mat-label>
                  <input
                    matInput
                    [(ngModel)]="newTask.title"
                    name="title"
                    required
                    placeholder="¿Qué necesitas hacer?"
                  >
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Categoría</mat-label>
                  <mat-select [(ngModel)]="newTask.category" name="category">
                    <mat-option
                      *ngFor="let category of taskService.categories()"
                      [value]="category.name"
                    >
                      {{ category.name }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Prioridad</mat-label>
                  <mat-select [(ngModel)]="newTask.priority" name="priority" required>
                    <mat-option value="low">Baja</mat-option>
                    <mat-option value="medium">Media</mat-option>
                    <mat-option value="high">Alta</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Fecha límite</mat-label>
                  <input
                    matInput
                    [matDatepicker]="picker"
                    [(ngModel)]="newTask.dueDate"
                    name="dueDate"
                  >
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Descripción</mat-label>
                <textarea
                  matInput
                  [(ngModel)]="newTask.description"
                  name="description"
                  rows="3"
                  placeholder="Describe la tarea en detalle..."
                ></textarea>
              </mat-form-field>

              <div class="form-actions">
                <button
                  mat-raised-button
                  color="primary"
                  (click)="addTask()"
                  [disabled]="!taskForm.valid || taskService.loading()"
                >
                  <mat-icon>add</mat-icon>
                  Agregar Tarea
                </button>
                <button
                  mat-stroked-button
                  type="button"
                  (click)="clearForm()"
                >
                  <mat-icon>clear</mat-icon>
                  Limpiar
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Lista de tareas -->
        <mat-card class="tasks-card">
          <mat-card-header>
            <mat-card-title>Mis Tareas</mat-card-title>
            <div class="filter-controls">
              <mat-form-field appearance="outline">
                <mat-label>Filtrar por categoría</mat-label>
                <mat-select [(ngModel)]="selectedCategory" (selectionChange)="applyFilters()">
                  <mat-option value="">Todas</mat-option>
                  <mat-option
                    *ngFor="let category of taskService.categories()"
                    [value]="category.name"
                  >
                    {{ category.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Ordenar por</mat-label>
                <mat-select [(ngModel)]="sortBy" (selectionChange)="applyFilters()">
                  <mat-option value="dueDate">Fecha límite</mat-option>
                  <mat-option value="priority">Prioridad</mat-option>
                  <mat-option value="createdAt">Fecha creación</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </mat-card-header>

          <mat-card-content>
            @if (taskService.loading()) {
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            }

            <div class="tasks-list">
              @for (task of filteredTasks(); track task.id) {
                <div class="task-item" [class.completed]="task.completed">
                  <div class="task-checkbox">
                    <mat-checkbox
                      [checked]="task.completed"
                      (change)="toggleTaskCompletion(task.id, $event.checked)"
                    ></mat-checkbox>
                  </div>
                  
                  <div class="task-content">
                    <div class="task-header">
                      <h3 [class.completed]="task.completed">{{ task.title }}</h3>
                      <span
                        class="priority-badge"
                        [class]="task.priority"
                      >
                        {{ task.priority === 'high' ? 'Alta' : 
                            task.priority === 'medium' ? 'Media' : 'Baja' }}
                      </span>
                    </div>
                    
                    <p class="task-description">{{ task.description }}</p>
                    
                    <div class="task-meta">
                      @if (task.category) {
                        <span class="category-tag">{{ task.category }}</span>
                      }
                      @if (task.dueDate) {
                        <span class="due-date">
                          <mat-icon>event</mat-icon>
                          {{ task.dueDate | date:'shortDate' }}
                        </span>
                      }
                      <span class="created-date">
                        Creada: {{ task.createdAt | date:'shortDate' }}
                      </span>
                    </div>
                  </div>

                  <div class="task-actions">
                    <button
                      mat-icon-button
                      color="warn"
                      (click)="deleteTask(task.id)"
                      [disabled]="taskService.loading()"
                    >
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>
              } @empty {
                <div class="no-tasks">
                  <mat-icon>assignment</mat-icon>
                  <p>No hay tareas registradas</p>
                </div>
              }
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .task-manager { padding: 1rem; max-width: 1200px; margin: 0 auto; }
    
    .header-card { 
      margin-bottom: 2rem; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      color: white;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
    
    .header-stats { display: flex; gap: 2rem; }
    .stat { text-align: center; }
    
    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: bold;
    }
    
    .stat-number.completed { color: #4caf50; }
    .stat-number.pending { color: #ff9800; }
    .stat-label { font-size: 0.875rem; opacity: 0.8; }
    
    .manager-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 2rem;
    }
    
    .form-card, .tasks-card { height: fit-content; }
    .form-row { display: flex; gap: 1rem; margin-bottom: 1rem; }
    .form-field, .full-width { width: 100%; }
    .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }
    
    .filter-controls {
      display: flex;
      gap: 1rem;
      margin-left: auto;
    }
    
    .tasks-list { max-height: 600px; overflow-y: auto; }
    
    .task-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      background: white;
    }
    
    .task-item.completed {
      background: #f8f9fa;
      opacity: 0.7;
    }
    
    .task-checkbox { margin-right: 1rem; margin-top: 0.25rem; }
    .task-content { flex: 1; }
    
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .task-header h3 {
      margin: 0;
      font-size: 1.1rem;
    }
    
    .task-header h3.completed {
      text-decoration: line-through;
    }
    
    .priority-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.75rem;
      color: white;
    }
    
    .priority-badge.high { background: #f44336; }
    .priority-badge.medium { background: #ff9800; }
    .priority-badge.low { background: #4caf50; }
    
    .task-description {
      margin: 0 0 0.5rem 0;
      color: #666;
      line-height: 1.4;
    }
    
    .task-meta {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-size: 0.875rem;
      color: #666;
    }
    
    .category-tag {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-size: 0.75rem;
    }
    
    .due-date, .created-date {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .task-actions { margin-left: 1rem; }
    
    .no-tasks {
      text-align: center;
      padding: 3rem;
      color: #666;
    }
    
    .no-tasks mat-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .manager-content { grid-template-columns: 1fr; }
      .header-content { flex-direction: column; gap: 1rem; }
      .header-stats { justify-content: space-around; width: 100%; }
      .form-row { flex-direction: column; gap: 0; }
      .filter-controls { flex-direction: column; width: 100%; }
      .task-meta { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
    }
  `]
})
export class TaskManagerComponent {
  taskService = inject(TaskService);
  snackBar = inject(MatSnackBar);

  newTask = {
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: '',
    dueDate: ''
  };

  selectedCategory = '';
  sortBy = 'dueDate';

  stats = computed(() => this.taskService.getTaskStats());

  filteredTasks = computed(() => {
    let tasks = this.taskService.tasks();

    // Filtrar por categoría
    if (this.selectedCategory) {
      tasks = tasks.filter(task => task.category === this.selectedCategory);
    }

    // Ordenar
    tasks = [...tasks].sort((a, b) => {
      switch (this.sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return tasks;
  });

  async addTask() {
    const task = await this.taskService.createTask({
      ...this.newTask,
      completed: false,
      userId: 1,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as Omit<Task, 'id'>);

    if (task) {
      this.snackBar.open('Tarea creada correctamente', 'Cerrar', {
        duration: 3000
      });
      this.clearForm();
    }
  }

  async toggleTaskCompletion(taskId: number, completed: boolean) {
    await this.taskService.updateTask(taskId, { completed });
  }

  async deleteTask(taskId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      const success = await this.taskService.deleteTask(taskId);
      if (success) {
        this.snackBar.open('Tarea eliminada', 'Cerrar', {
          duration: 3000
        });
      }
    }
  }

  applyFilters() {
    // Los computed signals se actualizan automáticamente
  }

  clearForm() {
    this.newTask = {
      title: '',
      description: '',
      priority: 'medium',
      category: '',
      dueDate: ''
    };
  }
}