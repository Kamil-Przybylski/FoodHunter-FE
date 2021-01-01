import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { plainToClass, classToPlain, ClassTransformOptions } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate, ValidationError } from 'class-validator';
import * as _ from 'lodash';
import { DtoWrapper, HttpOptions } from '@core/models/custom-http.models';

const plainToClassOptions: ClassTransformOptions = {
  strategy: 'excludeAll',
  excludeExtraneousValues: true,
};

@Injectable({
  providedIn: 'root',
})
export class HttpDtoService {
  private baseAuthApiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  private checkErrorsAndReturnPlain<R, C>({ res, errors }: { res: C; errors: ValidationError[] }): R {
    if (errors.length > 0) {
      console.error('FH-Error: Niepoprawny format przychodzących danych', errors);
      throw new Error('Niepoprawny format przychodzących danych');
    } else {
      return classToPlain(res) as R;
    }
  }

  private validateClass<C>(r: C): Observable<{ res: C; errors: ValidationError[] }> {
    if (_.isArray(r)) {
      if (r.length === 0) return of({ res: r, errors: [] });
      
      const errors$: Promise<ValidationError[]>[] = [];
      _.forEach(r, (item) => errors$.push(validate(item)));

      return of(errors$).pipe(
        switchMap((errors) => from(errors)),
        switchMap((errors) => errors),
        map((errors) => ({ res: r, errors: errors }))
      );
    } else if (!r) {
      return of({ res: r, errors: [] });
    } else {
      return from(validate(r)).pipe(map((e) => ({ res: r, errors: e })));
    }
  }

  private mapper<R, C extends DtoWrapper<R>>(request$: Observable<unknown>, model: ClassType<C>): Observable<R> {
    return request$.pipe(
      map((r) => {
        return plainToClass<C, unknown>(model, r, plainToClassOptions);
      }),
      switchMap((r) => {
        return this.validateClass<C>(r);
      }),
      map((r) => {
        return this.checkErrorsAndReturnPlain<R, C>(r);
      })
    );
  }

  get<R, C extends DtoWrapper<R>>(model: ClassType<C>, url: string, options?: HttpOptions): Observable<R> {
    const http$ = this.httpClient.get<unknown>(`${this.baseAuthApiUrl}/${url}`, options || {});
    return this.mapper<R, C>(http$, model);
  }
  getMap<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    mapFn: (r: any) => any,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient
      .get<unknown>(`${this.baseAuthApiUrl}/${url}`, options || {})
      .pipe(map((r) => mapFn(r)));
    return this.mapper<R, C>(http$, model);
  }

  post<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    payload: unknown,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient.post<unknown>(`${this.baseAuthApiUrl}/${url}`, payload, options || {});
    return this.mapper<R, C>(http$, model);
  }
  postMap<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    payload: unknown,
    mapFn: (r: any) => any,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient
      .post<unknown>(`${this.baseAuthApiUrl}/${url}`, payload, options || {})
      .pipe(map((r) => mapFn(r)));
    return this.mapper<R, C>(http$, model);
  }

  put<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    payload: unknown,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient.put<unknown>(`${this.baseAuthApiUrl}/${url}`, payload, options || {});
    return this.mapper<R, C>(http$, model);
  }
  putMap<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    payload: unknown,
    mapFn: (r: any) => any,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient
      .put<unknown>(`${this.baseAuthApiUrl}/${url}`, payload, options || {})
      .pipe(map((r) => mapFn(r)));
    return this.mapper<R, C>(http$, model);
  }

  patch<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    payload: unknown,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient.patch<unknown>(`${this.baseAuthApiUrl}/${url}`, payload, options || {});
    return this.mapper<R, C>(http$, model);
  }
  patchMap<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    payload: unknown,
    mapFn: (r: any) => any,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient
      .patch<unknown>(`${this.baseAuthApiUrl}/${url}`, payload, options || {})
      .pipe(map((r) => mapFn(r)));
    return this.mapper<R, C>(http$, model);
  }

  delete<R, C extends DtoWrapper<R>>(model: ClassType<C>, url: string, options?: HttpOptions): Observable<R> {
    const http$ = this.httpClient.delete<unknown>(`${this.baseAuthApiUrl}/${url}`, options || {});
    return this.mapper<R, C>(http$, model);
  }
  deleteMap<R, C extends DtoWrapper<R>>(
    model: ClassType<C>,
    url: string,
    mapFn: (r: any) => any,
    options?: HttpOptions
  ): Observable<R> {
    const http$ = this.httpClient
      .delete<unknown>(`${this.baseAuthApiUrl}/${url}`, options || {})
      .pipe(map((r) => mapFn(r)));
    return this.mapper<R, C>(http$, model);
  }
}
