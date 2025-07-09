import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BooksComponent } from './modules/books/books.component';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'books', component: BooksComponent },
      { path: 'reader', component: DashboardComponent }, // Placeholder
      { path: 'recommended', component: DashboardComponent }, // Placeholder
      { path: 'stats', component: DashboardComponent }, // Placeholder
      { path: 'admin', component: DashboardComponent }, // Placeholder
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
