import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(false);
  private _userEmail = signal<string | null>(null);

  get isLoggedIn() {
    return this._isLoggedIn();
  }

  get userEmail() {
    return this._userEmail();
  }

  login(email: string, password: string): boolean {
    if (email === 'jenny@jenny.com' && password === '123') {
      this._isLoggedIn.set(true);
      this._userEmail.set(email);
      return true;
    }
    this._isLoggedIn.set(false);
    this._userEmail.set(null);
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    this._userEmail.set(null);
  }
} 