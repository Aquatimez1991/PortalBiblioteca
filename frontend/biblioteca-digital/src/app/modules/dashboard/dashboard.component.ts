import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDividerModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Header Section -->
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1 class="welcome-title">¡Bienvenido a tu Biblioteca Digital!</h1>
          <p class="welcome-subtitle">Descubre miles de libros electrónicos disponibles 24/7</p>
        </div>
        <div class="quick-actions">
          <button mat-raised-button color="primary" class="action-button">
            <mat-icon>search</mat-icon>
            Buscar Libros
          </button>
          <button mat-raised-button color="accent" class="action-button">
            <mat-icon>star</mat-icon>
            Ver Recomendados
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon">
                <mat-icon>library_books</mat-icon>
              </div>
              <div class="stat-info">
                <h3 class="stat-number">{{ totalBooks }}</h3>
                <p class="stat-label">Libros Disponibles</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon">
                <mat-icon>download</mat-icon>
              </div>
              <div class="stat-info">
                <h3 class="stat-number">{{ totalDownloads }}</h3>
                <p class="stat-label">Descargas Este Mes</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon">
                <mat-icon>visibility</mat-icon>
              </div>
              <div class="stat-info">
                <h3 class="stat-number">{{ totalReads }}</h3>
                <p class="stat-label">Lecturas Online</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon">
                <mat-icon>people</mat-icon>
              </div>
              <div class="stat-info">
                <h3 class="stat-number">{{ activeUsers }}</h3>
                <p class="stat-label">Usuarios Activos</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Featured Books -->
        <mat-card class="featured-books-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>star</mat-icon>
              Libros Destacados
            </mat-card-title>
            <mat-card-subtitle>Los más populares este mes</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="books-grid">
              <div class="book-card" *ngFor="let book of featuredBooks">
                <img [src]="book.cover" [alt]="book.title" class="book-cover" />
                <div class="book-card-content">
                  <h4 class="book-title">{{ book.title }}</h4>
                  <p class="book-author">{{ book.author }}</p>
                  <div class="book-stats">
                    <mat-chip-set>
                      <mat-chip color="primary" variant="outlined">{{ book.category }}</mat-chip>
                    </mat-chip-set>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Activity -->
        <mat-card class="activity-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>history</mat-icon>
              Actividad Reciente
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-list">
              <div class="activity-item" *ngFor="let activity of recentActivity">
                <div class="activity-icon">
                  <mat-icon [class]="activity.iconClass">{{ activity.icon }}</mat-icon>
                </div>
                <div class="activity-content">
                  <p class="activity-text">{{ activity.text }}</p>
                  <span class="activity-time">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Quick Access -->
        <mat-card class="quick-access-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>flash_on</mat-icon>
              Acceso Rápido
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="quick-access-grid">
              <button mat-stroked-button class="quick-access-button" *ngFor="let item of quickAccess">
                <mat-icon>{{ item.icon }}</mat-icon>
                <span>{{ item.label }}</span>
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Reading Progress -->
        <mat-card class="progress-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>trending_up</mat-icon>
              Mi Progreso de Lectura
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="progress-section" *ngFor="let progress of readingProgress">
              <div class="progress-header">
                <span class="progress-title">{{ progress.title }}</span>
                <span class="progress-percentage">{{ progress.percentage }}%</span>
              </div>
              <mat-progress-bar 
                [value]="progress.percentage" 
                [color]="progress.color"
                class="progress-bar">
              </mat-progress-bar>
              <p class="progress-subtitle">{{ progress.subtitle }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .welcome-title {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .welcome-subtitle {
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
    }

    .quick-actions {
      display: flex;
      gap: 12px;
    }

    .action-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .stat-card {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .stat-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .stat-number {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      color: #333;
    }

    .stat-label {
      font-size: 14px;
      color: #666;
      margin: 4px 0 0 0;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    .featured-books-card {
      grid-column: 1 / -1;
      border-radius: 12px;
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 16px;
    }

    .book-item {
      border-radius: 8px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }

    .book-item:hover {
      transform: translateY(-4px);
    }

    .book-cover {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .book-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .book-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .book-item:hover .book-overlay {
      opacity: 1;
    }

    .book-info {
      padding: 16px;
    }

    .book-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #333;
    }

    .book-author {
      font-size: 14px;
      color: #666;
      margin: 0 0 8px 0;
    }

    .activity-card, .quick-access-card, .progress-card {
      border-radius: 12px;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      background: #f8f9fa;
    }

    .activity-icon {
      background: #e3f2fd;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1976d2;
    }

    .activity-text {
      font-size: 14px;
      margin: 0;
      color: #333;
    }

    .activity-time {
      font-size: 12px;
      color: #666;
    }

    .quick-access-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .quick-access-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      height: auto;
    }

    .progress-section {
      margin-bottom: 20px;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .progress-title {
      font-weight: 500;
      color: #333;
    }

    .progress-percentage {
      font-weight: 600;
      color: #1976d2;
    }

    .progress-bar {
      margin-bottom: 4px;
    }

    .progress-subtitle {
      font-size: 12px;
      color: #666;
      margin: 0;
    }

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
      
      .dashboard-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
      
      .quick-actions {
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }
      
      .books-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 16px;
      }
      
      .quick-access-grid {
        grid-template-columns: 1fr;
      }
    }

    .books-grid .book-card {
      display: flex;
      flex-direction: column;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 2px 12px rgba(44,44,44,0.08);
      overflow: hidden;
      transition: transform 0.18s, box-shadow 0.18s;
      cursor: pointer;
      height: 100%;
      justify-content: flex-start;
    }
    .books-grid .book-card:hover {
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 8px 24px rgba(44,44,44,0.16);
    }
    .book-cover {
      width: 100%;
      height: 170px;
      object-fit: cover;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      background: #e0e0e0;
      box-shadow: 0 1px 4px rgba(44,44,44,0.06);
      display: block;
    }
    .book-card-content {
      padding: 2.2rem 1rem 1.2rem 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.3rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalBooks = 15420;
  totalDownloads = 2847;
  totalReads = 5673;
  activeUsers = 892;

  featuredBooks = [
    {
      title: 'El Señor de los Anillos',
      author: 'J.R.R. Tolkien',
      cover: 'assets/covers/lotr.jpg',
      category: 'Fantasía'
    },
    {
      title: 'Cien Años de Soledad',
      author: 'Gabriel García Márquez',
      cover: 'assets/covers/cien-anos.jpg',
      category: 'Literatura'
    },
    {
      title: '1984',
      author: 'George Orwell',
      cover: 'assets/covers/1984.jpg',
      category: 'Ciencia Ficción'
    },
    {
      title: 'Don Quijote',
      author: 'Miguel de Cervantes',
      cover: 'assets/covers/don-quijote.jpg',
      category: 'Clásico'
    }
  ];

  recentActivity = [
    {
      icon: 'download',
      iconClass: 'download-icon',
      text: 'Descargaste "El Principito"',
      time: 'Hace 2 horas'
    },
    {
      icon: 'book',
      iconClass: 'read-icon',
      text: 'Continuaste leyendo "1984"',
      time: 'Hace 4 horas'
    },
    {
      icon: 'star',
      iconClass: 'favorite-icon',
      text: 'Marcaste como favorito "Cien Años de Soledad"',
      time: 'Ayer'
    },
    {
      icon: 'bookmark',
      iconClass: 'bookmark-icon',
      text: 'Agregaste marcador en "Don Quijote"',
      time: 'Hace 2 días'
    }
  ];

  quickAccess = [
    { icon: 'search', label: 'Buscar' },
    { icon: 'star', label: 'Favoritos' },
    { icon: 'history', label: 'Historial' },
    { icon: 'bookmark', label: 'Marcadores' },
    { icon: 'download', label: 'Descargas' },
    { icon: 'settings', label: 'Configuración' }
  ];

  readingProgress = [
    {
      title: 'El Señor de los Anillos',
      percentage: 75,
      color: 'primary',
      subtitle: 'Página 450 de 600'
    },
    {
      title: '1984',
      percentage: 45,
      color: 'accent',
      subtitle: 'Página 180 de 400'
    },
    {
      title: 'Don Quijote',
      percentage: 20,
      color: 'warn',
      subtitle: 'Página 80 de 400'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
} 