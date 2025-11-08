import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIcon } from "@angular/material/icon";

export interface DashboardCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIcon
],
  template: `
    <mat-sidenav-container class="dashboard-container">
      <mat-sidenav #sidenav mode="side" opened>
        <mat-toolbar>Dashboard</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            Resumen
          </a>
          <a mat-list-item>
            <mat-icon>people</mat-icon>
            Usuarios
          </a>
          <a mat-list-item>
            <mat-icon>settings</mat-icon>
            Configuración
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Mi Dashboard</span>
        </mat-toolbar>

        <div class="dashboard-content">
          <!-- Cards con Grid Layout -->
          <mat-grid-list [cols]="gridCols()" rowHeight="100px" gutterSize="16px">
            @for (card of dashboardCards(); track card.title) {
              <mat-grid-tile>
                <mat-card class="dashboard-card" [style.border-left]="'4px solid ' + card.color">
                  <mat-card-content>
                    <div class="card-content">
                      <div class="card-info">
                        <h3>{{ card.title }}</h3>
                        <p class="card-value">{{ card.value }}</p>
                      </div>
                      <mat-icon [style.color]="card.color" class="card-icon">
                        {{ card.icon }}
                      </mat-icon>
                    </div>
                  </mat-card-content>
                </mat-card>
              </mat-grid-tile>
            }
          </mat-grid-list>

          <!-- Tabla con paginación -->
          <mat-card class="table-card">
            <mat-card-header>
              <mat-card-title>Transacciones Recientes</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="paginatedTransactions()" class="mat-elevation-z2">
                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef>Fecha</th>
                  <td mat-cell *matCellDef="let transaction">{{ transaction.date }}</td>
                </ng-container>

                <ng-container matColumnDef="description">
                  <th mat-header-cell *matHeaderCellDef>Descripción</th>
                  <td mat-cell *matCellDef="let transaction">{{ transaction.description }}</td>
                </ng-container>

                <ng-container matColumnDef="amount">
                  <th mat-header-cell *matHeaderCellDef>Monto</th>
                  <td mat-cell *matCellDef="let transaction" 
                      [style.color]="transaction.type === 'income' ? 'green' : 'red'">
                    {{ transaction.amount | currency }}
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>

              <mat-paginator
                [length]="transactions().length"
                [pageSize]="pageSize()"
                [pageIndex]="pageIndex()"
                [pageSizeOptions]="[5, 10, 20]"
                (page)="onPageChange($event)"
                aria-label="Select page">
              </mat-paginator>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
    }
    .dashboard-content {
      padding: 20px;
    }
    .dashboard-card {
      width: 100%;
      height: 100%;
    }
    .card-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
    .card-info h3 {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
    .card-value {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .card-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
    }
    .table-card {
      margin-top: 20px;
    }
    table {
      width: 100%;
    }
  `]
})
export class DashboardComponent {
  dashboardCards = signal<DashboardCard[]>([
    { title: 'Usuarios Totales', value: '1,234', icon: 'people', color: '#2196F3' },
    { title: 'Ingresos Mensuales', value: '$45,678', icon: 'attach_money', color: '#4CAF50' },
    { title: 'Tareas Pendientes', value: '12', icon: 'assignment', color: '#FF9800' },
    { title: 'Soporte Activo', value: '5', icon: 'support', color: '#F44336' }
  ]);

  transactions = signal<Transaction[]>([
    { id: 1, date: '2024-01-15', description: 'Venta producto A', amount: 1000, type: 'income' },
    { id: 2, date: '2024-01-14', description: 'Compra suministros', amount: 250, type: 'expense' },
    { id: 3, date: '2024-01-13', description: 'Servicio consultoría', amount: 1500, type: 'income' },
    { id: 4, date: '2024-01-12', description: 'Mantenimiento equipo', amount: 300, type: 'expense' },
    { id: 5, date: '2024-01-11', description: 'Venta producto B', amount: 800, type: 'income' },
    { id: 6, date: '2024-01-10', description: 'Publicidad', amount: 200, type: 'expense' }
  ]);

  displayedColumns: string[] = ['date', 'description', 'amount'];
  pageSize = signal(5);
  pageIndex = signal(0);
  gridCols = signal(4);

  paginatedTransactions = signal<Transaction[]>([]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.updatePaginatedTransactions();
    
    // Responsive breakpoints
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.gridCols.set(1);
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.gridCols.set(2);
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.gridCols.set(3);
      } else {
        this.gridCols.set(4);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    this.updatePaginatedTransactions();
  }

  private updatePaginatedTransactions() {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    this.paginatedTransactions.set(
      this.transactions().slice(startIndex, endIndex)
    );
  }
}