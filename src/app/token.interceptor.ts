import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string;

  constructor(
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
  }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.token) this.token = this.authService.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(request);
  }
}
