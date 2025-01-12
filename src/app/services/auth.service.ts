import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes the service available throughout the app
})
export class AuthService {
  private tokenKey = 'token'; 

  constructor() {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if(!!token){
      return true
    }
    return false

  }
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry) return true;

    const now = new Date().getTime();
    return now > parseInt(expiry, 10);
  }
  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }getToken(): string | null {
    return localStorage.getItem('token');
  }

}
