import { AppRoutesEnum } from './../../app.routes';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginRegisterGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogged().pipe(
      map((isLogged) => !isLogged),
      tap((isNotLogged) => {
        if (!isNotLogged) this.router.navigate([AppRoutesEnum.APP]);
      })
    );
  }
}
