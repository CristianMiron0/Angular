import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task, Category } from '../models/task.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';
  
  tasks = signal<Task[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(false);

  constructor(private http: HttpClient) {
    this.loadTasks();
    this.loadCategories();
  }

  // Tasks CRUD
  async loadTasks(): Promise<void> {
    this.loading.set(true);
    try {
      const tasks = await firstValueFrom(this.http.get<Task[]>(`${this.apiUrl}/tasks`));
      this.tasks.set(tasks || []);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async createTask(task: Omit<Task, 'id'>): Promise<Task | null> {
    try {
      const newTask = await firstValueFrom(this.http.post<Task>(`${this.apiUrl}/tasks`, {
        ...task,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
      await this.loadTasks();
      return newTask || null;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  async updateTask(id: number, updates: Partial<Task>): Promise<Task | null> {
    try {
      const updated = await firstValueFrom(this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`, {
        ...updates,
        updatedAt: new Date().toISOString()
      }));
      await this.loadTasks();
      return updated || null;
    } catch (error) {
      console.error('Error updating task:', error);
      return null;
    }
  }

  async deleteTask(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/tasks/${id}`));
      await this.loadTasks();
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }

  // Categories
  async loadCategories(): Promise<void> {
    try {
      const categories = await firstValueFrom(this.http.get<Category[]>(`${this.apiUrl}/categories`));
      this.categories.set(categories || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  // Estadísticas
  getTaskStats() {
    const tasks = this.tasks();
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length
    };
  }
}