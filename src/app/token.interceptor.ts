import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenEnum } from 'src/config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string;

  constructor(
    private authService: AuthService
  ) {
    this.token = this.authService.getToken();
  }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(request);
  }
}