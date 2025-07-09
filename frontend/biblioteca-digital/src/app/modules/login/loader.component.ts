import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-backdrop">
      <div class="spinner"></div>
      <div class="loader-text" *ngIf="text">{{ text }}</div>
    </div>
  `,
  styles: [
    `.loader-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(24, 25, 26, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s;
    }
    .spinner {
      width: 60px;
      height: 60px;
      border: 6px solid #7b5cff44;
      border-top: 6px solid #7b5cff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1.2rem;
    }
    .loader-text {
      color: #fff;
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 1px;
      text-align: center;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `
  ]
})
export class LoaderComponent {
  @Input() text: string = '';
}
