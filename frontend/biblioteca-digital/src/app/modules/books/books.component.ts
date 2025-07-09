import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="books-container">
      <!-- Header Section -->
      <div class="books-header">
        <div class="header-content">
          <h1 class="page-title">Catálogo de Libros</h1>
          <p class="page-subtitle">Explora nuestra colección de libros electrónicos</p>
        </div>
        <div class="header-actions">
          <button mat-raised-button color="primary" class="action-button">
            <mat-icon>add</mat-icon>
            Agregar Libro
          </button>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="filters-section">
        <div class="search-box">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Buscar libros...</mat-label>
            <input matInput [(ngModel)]="searchTerm" (input)="onSearchChange()" placeholder="Título, autor, ISBN...">
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>

        <div class="filter-controls">
          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Categoría</mat-label>
            <mat-select [(ngModel)]="selectedCategory" (selectionChange)="onFilterChange()">
              <mat-option value="">Todas las categorías</mat-option>
              <mat-option *ngFor="let category of categories" [value]="category">
                {{ category }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Ordenar por</mat-label>
            <mat-select [(ngModel)]="sortBy" (selectionChange)="onSortChange()">
              <mat-option value="title">Título</mat-option>
              <mat-option value="author">Autor</mat-option>
              <mat-option value="year">Año</mat-option>
              <mat-option value="popularity">Popularidad</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="filter-field">
            <mat-label>Idioma</mat-label>
            <mat-select [(ngModel)]="selectedLanguage" (selectionChange)="onFilterChange()">
              <mat-option value="">Todos los idiomas</mat-option>
              <mat-option value="es">Español</mat-option>
              <mat-option value="en">Inglés</mat-option>
              <mat-option value="fr">Francés</mat-option>
              <mat-option value="de">Alemán</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="active-filters" *ngIf="hasActiveFilters">
          <span class="filter-label">Filtros activos:</span>
          <mat-chip-set>
            <mat-chip *ngIf="selectedCategory" (removed)="removeCategoryFilter()" removable>
              {{ selectedCategory }}
            </mat-chip>
            <mat-chip *ngIf="selectedLanguage" (removed)="removeLanguageFilter()" removable>
              {{ getLanguageName(selectedLanguage) }}
            </mat-chip>
            <mat-chip *ngIf="searchTerm" (removed)="removeSearchFilter()" removable>
              "{{ searchTerm }}"
            </mat-chip>
          </mat-chip-set>
          <button mat-button color="primary" (click)="clearAllFilters()">
            Limpiar filtros
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section">
        <div class="results-header">
          <div class="results-info">
            <span class="results-count">{{ totalBooks }} libros encontrados</span>
            <span class="results-time">Actualizado hace 5 minutos</span>
          </div>
          <div class="view-controls">
            <button mat-icon-button [class.active]="viewMode === 'grid'" (click)="setViewMode('grid')" matTooltip="Vista de cuadrícula">
              <mat-icon>grid_view</mat-icon>
            </button>
            <button mat-icon-button [class.active]="viewMode === 'list'" (click)="setViewMode('list')" matTooltip="Vista de lista">
              <mat-icon>view_list</mat-icon>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div class="loading-container" *ngIf="loading">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Cargando libros...</p>
        </div>

        <!-- Books Grid -->
        <div class="books-grid" *ngIf="!loading && viewMode === 'grid'">
          <mat-card class="book-card" *ngFor="let book of displayedBooks">
            <div class="book-cover">
              <img [src]="book.cover" [alt]="book.title" class="book-image">
              <div class="book-overlay">
                <div class="overlay-actions">
                  <button mat-icon-button color="white" matTooltip="Leer online" (click)="readBook(book)">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button color="white" matTooltip="Descargar" (click)="downloadBook(book)">
                    <mat-icon>download</mat-icon>
                  </button>
                  <button mat-icon-button color="white" matTooltip="Agregar a favoritos" (click)="toggleFavorite(book)">
                    <mat-icon>{{ book.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
                  </button>
                </div>
              </div>
              <div class="book-badge" *ngIf="book.isNew">
                <span class="badge-text">NUEVO</span>
              </div>
            </div>
            
            <mat-card-content class="book-content">
              <h3 class="book-title" [matTooltip]="book.title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-publisher" *ngIf="book.publisher">{{ book.publisher }}</p>
              
              <div class="book-meta">
                <span class="book-year" *ngIf="book.year">{{ book.year }}</span>
                <span class="book-pages" *ngIf="book.pages">{{ book.pages }} págs.</span>
                <span class="book-language">{{ getLanguageName(book.language) }}</span>
              </div>

              <div class="book-stats">
                <div class="stat-item">
                  <mat-icon class="stat-icon">visibility</mat-icon>
                  <span class="stat-value">{{ book.readCount }}</span>
                </div>
                <div class="stat-item">
                  <mat-icon class="stat-icon">download</mat-icon>
                  <span class="stat-value">{{ book.downloadCount }}</span>
                </div>
                <div class="stat-item">
                  <mat-icon class="stat-icon">star</mat-icon>
                  <span class="stat-value">{{ book.rating }}</span>
                </div>
              </div>

              <div class="book-categories">
                <mat-chip-set>
                  <mat-chip color="primary" variant="outlined" *ngFor="let category of book.categories">
                    {{ category }}
                  </mat-chip>
                </mat-chip-set>
              </div>
            </mat-card-content>

            <mat-card-actions class="book-actions">
              <button mat-button color="primary" (click)="readBook(book)">
                <mat-icon>visibility</mat-icon>
                Leer
              </button>
              <button mat-button color="accent" (click)="downloadBook(book)">
                <mat-icon>download</mat-icon>
                Descargar
              </button>
              <button mat-icon-button [color]="book.isFavorite ? 'warn' : ''" (click)="toggleFavorite(book)">
                <mat-icon>{{ book.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>
        </div>

        <!-- Books List -->
        <div class="books-list" *ngIf="!loading && viewMode === 'list'">
          <mat-card class="book-list-item" *ngFor="let book of displayedBooks">
            <div class="list-item-content">
              <div class="book-cover-small">
                <img [src]="book.cover" [alt]="book.title" class="book-image-small">
              </div>
              
              <div class="book-info">
                <h3 class="book-title">{{ book.title }}</h3>
                <p class="book-author">{{ book.author }}</p>
                <p class="book-description" *ngIf="book.description">{{ book.description }}</p>
                
                <div class="book-meta-list">
                  <span class="meta-item" *ngIf="book.publisher">{{ book.publisher }}</span>
                  <span class="meta-item" *ngIf="book.year">{{ book.year }}</span>
                  <span class="meta-item" *ngIf="book.pages">{{ book.pages }} páginas</span>
                  <span class="meta-item">{{ getLanguageName(book.language) }}</span>
                </div>

                <div class="book-categories-list">
                  <mat-chip-set>
                    <mat-chip color="primary" variant="outlined" *ngFor="let category of book.categories">
                      {{ category }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </div>

              <div class="book-stats-list">
                <div class="stat-item">
                  <mat-icon>visibility</mat-icon>
                  <span>{{ book.readCount }}</span>
                </div>
                <div class="stat-item">
                  <mat-icon>download</mat-icon>
                  <span>{{ book.downloadCount }}</span>
                </div>
                <div class="stat-item">
                  <mat-icon>star</mat-icon>
                  <span>{{ book.rating }}</span>
                </div>
              </div>

              <div class="book-actions-list">
                <button mat-raised-button color="primary" (click)="readBook(book)">
                  <mat-icon>visibility</mat-icon>
                  Leer
                </button>
                <button mat-stroked-button color="accent" (click)="downloadBook(book)">
                  <mat-icon>download</mat-icon>
                  Descargar
                </button>
                <button mat-icon-button [color]="book.isFavorite ? 'warn' : ''" (click)="toggleFavorite(book)">
                  <mat-icon>{{ book.isFavorite ? 'favorite' : 'favorite_border' }}</mat-icon>
                </button>
              </div>
            </div>
          </mat-card>
        </div>

        <!-- Pagination -->
        <mat-paginator 
          [length]="totalBooks"
          [pageSize]="pageSize"
          [pageSizeOptions]="[12, 24, 48, 96]"
          [pageIndex]="currentPage"
          (page)="onPageChange($event)"
          class="pagination">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .books-container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .books-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .page-title {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .page-subtitle {
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
    }

    .action-button {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filters-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .search-box {
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
    }

    .filter-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .filter-field {
      width: 100%;
    }

    .active-filters {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-label {
      font-weight: 500;
      color: #666;
    }

    .results-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .results-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .results-count {
      font-weight: 600;
      color: #333;
    }

    .results-time {
      font-size: 12px;
      color: #666;
    }

    .view-controls {
      display: flex;
      gap: 8px;
    }

    .view-controls button.active {
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 48px;
    }

    .books-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .book-card {
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .book-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .book-cover {
      position: relative;
      height: 300px;
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
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .book-card:hover .book-overlay {
      opacity: 1;
    }

    .overlay-actions {
      display: flex;
      gap: 8px;
    }

    .book-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #ff5722;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
    }

    .book-content {
      padding: 16px;
    }

    .book-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #333;
      line-height: 1.3;
    }

    .book-author {
      font-size: 14px;
      color: #666;
      margin: 0 0 4px 0;
    }

    .book-publisher {
      font-size: 12px;
      color: #999;
      margin: 0 0 12px 0;
    }

    .book-meta {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 12px;
      color: #666;
    }

    .book-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 16px;
      padding: 12px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .stat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #666;
    }

    .stat-value {
      font-size: 12px;
      font-weight: 600;
      color: #333;
    }

    .book-categories {
      margin-bottom: 16px;
    }

    .book-actions {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      background: #f8f9fa;
    }

    .books-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
    }

    .book-list-item {
      border-radius: 12px;
    }

    .list-item-content {
      display: grid;
      grid-template-columns: 120px 1fr auto auto;
      gap: 20px;
      align-items: center;
      padding: 20px;
    }

    .book-cover-small {
      width: 120px;
      height: 160px;
      overflow: hidden;
      border-radius: 8px;
    }

    .book-image-small {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .book-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .book-description {
      font-size: 14px;
      color: #666;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .book-meta-list {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: #666;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .book-stats-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
    }

    .book-actions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .pagination {
      margin-top: 24px;
    }

    @media (max-width: 1024px) {
      .books-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
      
      .filter-controls {
        grid-template-columns: 1fr;
      }
      
      .list-item-content {
        grid-template-columns: 100px 1fr;
        gap: 16px;
      }
      
      .book-stats-list,
      .book-actions-list {
        grid-column: 1 / -1;
        flex-direction: row;
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .books-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
      }
      
      .results-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }
      
      .list-item-content {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .book-cover-small {
        width: 100%;
        max-width: 200px;
        margin: 0 auto;
      }
    }
  `]
})
export class BooksComponent implements OnInit {
  searchTerm = '';
  selectedCategory = '';
  selectedLanguage = '';
  sortBy = 'title';
  viewMode = 'grid';
  loading = false;
  currentPage = 0;
  pageSize = 12;
  totalBooks = 0;

  categories = [
    'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 'Misterio', 
    'Romance', 'Historia', 'Ciencia', 'Tecnología', 'Filosofía', 'Poesía'
  ];

  displayedBooks = [
    {
      id: 1,
      title: 'El Señor de los Anillos: La Comunidad del Anillo',
      author: 'J.R.R. Tolkien',
      publisher: 'Minotauro',
      year: 1954,
      pages: 576,
      language: 'es',
      description: 'La primera parte de la épica trilogía de fantasía que ha cautivado a millones de lectores.',
      cover: 'assets/covers/lotr.jpg',
      categories: ['Fantasía', 'Aventura'],
      readCount: 15420,
      downloadCount: 8923,
      rating: 4.8,
      isFavorite: true,
      isNew: false
    },
    {
      id: 2,
      title: 'Cien Años de Soledad',
      author: 'Gabriel García Márquez',
      publisher: 'Editorial Sudamericana',
      year: 1967,
      pages: 432,
      language: 'es',
      description: 'Obra maestra del realismo mágico que narra la historia de la familia Buendía.',
      cover: 'assets/covers/cien-anos.jpg',
      categories: ['Literatura', 'Realismo Mágico'],
      readCount: 12345,
      downloadCount: 6543,
      rating: 4.9,
      isFavorite: false,
      isNew: true
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      publisher: 'Secker & Warburg',
      year: 1949,
      pages: 328,
      language: 'en',
      description: 'Distopía clásica que explora los peligros del totalitarismo y la vigilancia masiva.',
      cover: 'assets/covers/1984.jpg',
      categories: ['Ciencia Ficción', 'Distopía'],
      readCount: 9876,
      downloadCount: 5432,
      rating: 4.7,
      isFavorite: true,
      isNew: false
    }
  ];

  constructor() {
    this.totalBooks = this.displayedBooks.length;
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    // Simular carga de datos
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onSearchChange(): void {
    // Implementar búsqueda
    console.log('Búsqueda:', this.searchTerm);
  }

  onFilterChange(): void {
    // Implementar filtros
    console.log('Filtros:', { category: this.selectedCategory, language: this.selectedLanguage });
  }

  onSortChange(): void {
    // Implementar ordenamiento
    console.log('Ordenar por:', this.sortBy);
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadBooks();
  }

  readBook(book: any): void {
    console.log('Leer libro:', book.title);
  }

  downloadBook(book: any): void {
    console.log('Descargar libro:', book.title);
  }

  toggleFavorite(book: any): void {
    book.isFavorite = !book.isFavorite;
    console.log('Toggle favorito:', book.title, book.isFavorite);
  }

  getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      'es': 'Español',
      'en': 'Inglés',
      'fr': 'Francés',
      'de': 'Alemán'
    };
    return languages[code] || code;
  }

  get hasActiveFilters(): boolean {
    return !!(this.selectedCategory || this.selectedLanguage || this.searchTerm);
  }

  removeCategoryFilter(): void {
    this.selectedCategory = '';
    this.onFilterChange();
  }

  removeLanguageFilter(): void {
    this.selectedLanguage = '';
    this.onFilterChange();
  }

  removeSearchFilter(): void {
    this.searchTerm = '';
    this.onSearchChange();
  }

  clearAllFilters(): void {
    this.selectedCategory = '';
    this.selectedLanguage = '';
    this.searchTerm = '';
    this.onFilterChange();
  }
} 