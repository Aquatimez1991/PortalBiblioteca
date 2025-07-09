import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <div class="welcome-backdrop">
      <div class="welcome-message">
        <h1>¡Bienvenida {{ name }}!</h1>
      </div>
    </div>
  `,
  styles: [`
    .welcome-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(24, 25, 26, 0.92);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2100;
      animation: fadeIn 0.4s;
    }
    .welcome-message {
      background: linear-gradient(90deg, #7b5cff 0%, #5e8bff 100%);
      padding: 2.5rem 2.5rem;
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      color: #fff;
      text-align: center;
      animation: popIn 0.7s;
    }
    .welcome-message h1 {
      margin: 0;
      font-size: 2.2rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 2px 8px #5e8bff44;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes popIn {
      0% { transform: scale(0.8); opacity: 0; }
      80% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); }
    }
  `]
})
export class WelcomeComponent {
  @Input() name = 'Jenny';
} 