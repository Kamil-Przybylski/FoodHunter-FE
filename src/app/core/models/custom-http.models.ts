import { HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpErrorResDto {
  error!: string;
  message!: string;
  statusCode!: number;
}

export interface HttpErrorRes {
  error: string;
  message: string;
  statusCode: number;
}

export interface HttpOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | string[];
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
export interface HttpPaginatorMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  isLastPage: boolean;
  isLastForInfiniteScroll: boolean;
}
export interface HttpPaginator<T> {
  items: T;
  links: { first: string; previous: string; next: string; last: string };
  meta: HttpPaginatorMeta;
}

export abstract class DtoWrapper<T> {}
