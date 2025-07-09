import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <button mat-icon-button (click)="sidenav.toggle()" class="menu-button">
        <mat-icon>menu</mat-icon>
      </button>
      <div class="toolbar-content">
        <div class="logo-section">
          <mat-icon class="logo-icon">library_books</mat-icon>
          <span class="app-title">Biblioteca Digital</span>
        </div>
        <div class="toolbar-actions">
          <button mat-icon-button [matMenuTriggerFor]="searchMenu">
            <mat-icon>search</mat-icon>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="notificationsMenu">
            <mat-icon [matBadge]="notificationCount" matBadgeColor="warn" aria-hidden="false">notifications</mat-icon>
          </button>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/books" routerLinkActive="active">
            <mat-icon matListItemIcon>library_books</mat-icon>
            <span matListItemTitle>Catálogo</span>
          </a>
          <a mat-list-item routerLink="/reader" routerLinkActive="active">
            <mat-icon matListItemIcon>book</mat-icon>
            <span matListItemTitle>Lector</span>
          </a>
          <a mat-list-item routerLink="/recommended" routerLinkActive="active">
            <mat-icon matListItemIcon>star</mat-icon>
            <span matListItemTitle>Recomendados</span>
          </a>
          <a mat-list-item routerLink="/stats" routerLinkActive="active">
            <mat-icon matListItemIcon>analytics</mat-icon>
            <span matListItemTitle>Estadísticas</span>
          </a>
          <a mat-list-item routerLink="/admin" routerLinkActive="active">
            <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
            <span matListItemTitle>Administración</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="main-content">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
    <!-- Menús -->
    <mat-menu #searchMenu="matMenu">
      <div class="search-menu-content">
        <input matInput placeholder="Buscar libros..." class="search-input">
      </div>
    </mat-menu>
    <mat-menu #notificationsMenu="matMenu">
      <button mat-menu-item>
        <mat-icon>info</mat-icon>
        <span>Nuevo libro disponible</span>
      </button>
      <button mat-menu-item>
        <mat-icon>warning</mat-icon>
        <span>Mantenimiento programado</span>
      </button>
    </mat-menu>
    <mat-menu #userMenu="matMenu">
      <button mat-menu-item>
        <mat-icon>person</mat-icon>
        <span>Mi Perfil</span>
      </button>
      <button mat-menu-item>
        <mat-icon>bookmark</mat-icon>
        <span>Mis Libros</span>
      </button>
      <button mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>Configuración</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>Cerrar Sesión</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `.toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 64px;
    }
    .toolbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    .app-title {
      font-size: 20px;
      font-weight: 500;
    }
    .toolbar-actions {
      display: flex;
      gap: 8px;
    }
    .menu-button {
      margin-right: 16px;
    }
    .sidenav-container {
      height: 100vh;
      margin-top: 64px;
    }
    .sidenav {
      width: 250px;
      background-color: #fff;
      box-shadow: 2px 0 8px rgba(0,0,0,0.06);
      border-top-right-radius: 16px;
      border-bottom-right-radius: 16px;
      padding-top: 8px;
    }
    .sidenav .mat-nav-list {
      padding-top: 16px;
    }
    .sidenav .mat-list-item {
      color: #333 !important;
      opacity: 1 !important;
      font-weight: 500;
      border-radius: 8px;
      margin-bottom: 4px;
      transition: background 0.2s, color 0.2s;
    }
    .sidenav .mat-list-item.active,
    .sidenav .mat-list-item.cdk-focused,
    .sidenav .mat-list-item.cdk-mouse-focused,
    .sidenav .mat-list-item.cdk-program-focused,
    .sidenav .mat-list-item:hover {
      background: linear-gradient(90deg, #7b5cff 0%, #5e8bff 100%);
      color: #fff !important;
      opacity: 1 !important;
    }
    .sidenav .mat-list-item.active mat-icon,
    .sidenav .mat-list-item:hover mat-icon {
      color: #fff !important;
    }
    .sidenav .mat-list-item mat-icon {
      color: #7b5cff;
      margin-right: 12px;
      font-size: 22px;
      vertical-align: middle;
      transition: color 0.2s;
    }
    .sidenav .mat-list-item span {
      font-size: 16px;
      vertical-align: middle;
    }
    .main-content {
      background-color: #f5f5f5;
    }
    .content-wrapper {
      padding: 24px;
      min-height: calc(100vh - 64px);
    }
    .search-menu-content {
      padding: 16px;
      min-width: 300px;
    }
    .search-input {
      width: 100%;
      border: none;
      outline: none;
      padding: 8px 12px;
      border-radius: 4px;
      background-color: #f5f5f5;
    }
    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }
      .content-wrapper {
        padding: 16px;
      }
      .app-title {
        font-size: 18px;
      }
    }
    `
  ]
})
export class MainLayoutComponent {
  notificationCount = 2;
} 