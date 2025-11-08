import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, firstValueFrom } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  // Métodos con Observable
  getUsersObservable(): Observable<User[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Métodos con async/await
  async loadUsers(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const users = await firstValueFrom(this.http.get<User[]>(this.apiUrl));
      this.users.set(users);
    } catch (err) {
      this.handleError(err as HttpErrorResponse);
    } finally {
      this.loading.set(false);
    }
  }

  async getUserById(id: number): Promise<User | undefined> {
    try {
      return await firstValueFrom(this.http.get<User>(`${this.apiUrl}/${id}`));
    } catch (err) {
      this.handleError(err as HttpErrorResponse);
      return undefined;
    }
  }

  async createUser(user: Omit<User, 'id'>): Promise<User | undefined> {
    try {
      const newUser = await firstValueFrom(this.http.post<User>(this.apiUrl, user));
      await this.loadUsers(); // Recargar lista
      return newUser;
    } catch (err) {
      this.handleError(err as HttpErrorResponse);
      return undefined;
    }
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | undefined> {
    try {
      const updatedUser = await firstValueFrom(this.http.patch<User>(`${this.apiUrl}/${id}`, user));
      await this.loadUsers(); // Recargar lista
      return updatedUser;
    } catch (err) {
      this.handleError(err as HttpErrorResponse);
      return undefined;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
      await this.loadUsers(); // Recargar lista
      return true;
    } catch (err) {
      this.handleError(err as HttpErrorResponse);
      return false;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loading.set(false);

    let errorMessage = 'Ha ocurrido un error';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    this.error.set(errorMessage);
    console.error('Error en UserService:', error);
    return throwError(() => new Error(errorMessage));
  }
}