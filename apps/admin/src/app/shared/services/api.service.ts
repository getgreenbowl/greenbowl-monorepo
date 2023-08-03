import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ListResponse, Response } from 'greenbowl-schema';
import { environment } from 'src/environments/environment.development';
import { GbNotification } from '../ui/notification/notification.service';

type QueryParams =
  | HttpParams
  | {
      [param: string]:
        | string
        | number
        | boolean
        | ReadonlyArray<string | number | boolean>;
    };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public token = 'gb_admin';
  private notif = inject(GbNotification);

  getToken() {
    return this.token;
  }
  constructor(private _http: HttpClient) {}

  private makeURL(endpoint: string) {
    return `${environment.api}${endpoint}`;
  }

  get<T>(endpoint: string, queryParams?: QueryParams): Observable<Response<T>> {
    return this._http
      .get<Response<T>>(this.makeURL(endpoint), {
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  getList<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<ListResponse<T>> {
    return this._http
      .get<ListResponse<T>>(this.makeURL(endpoint), {
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<Response<T>> {
    return this._http
      .delete<Response<T>>(this.makeURL(endpoint), {
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, body: unknown): Observable<Response<T>> {
    return this._http
      .post<Response<T>>(this.makeURL(endpoint), body)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: unknown): Observable<Response<T>> {
    return this._http
      .put<Response<T>>(this.makeURL(endpoint), body)
      .pipe(catchError(this.handleError));
  }

  media(
    endpoint: string,
    body: Partial<{
      single: { field: string; value: any };
      array: { field: string; value: any[] };
    }>
  ): Observable<any> {
    const formData = new FormData();
    if (body.single?.field && body.single?.value) {
      formData.append(body.single.field, body.single.value);
    }

    if (body?.array?.field && body?.array?.value) {
      for (const iterator of body.array.value) {
        formData.append(body.array.field, iterator);
      }
    }

    return this._http.post<any>(this.makeURL(endpoint), formData);
  }

  private handleError = (error: HttpErrorResponse) => {
    this.notif.show({
      text:
        this.qualifyError(error.error) ||
        this.qualifyError(error.error?.err?.name) ||
        'Something went wrong !',
      type: 'error',
    });

    return EMPTY;
  };

  private qualifyError(err: any) {
    if (typeof err === 'string') {
      return err;
    }
    return false;
  }
}
