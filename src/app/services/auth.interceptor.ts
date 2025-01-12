import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isTokenExpired()) {
      // Redirect to login if token is expired
      this.authService.clearToken();
      this.router.navigate(['/login']);
      return new Observable<HttpEvent<unknown>>();
    } 
    return next.handle(req);
  }
}
