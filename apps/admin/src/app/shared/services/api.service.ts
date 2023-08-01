import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponse, Response } from 'greenbowl-schema';
import { environment } from 'src/environments/environment.development';

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

  getToken() {
    return this.token;
  }
  constructor(private _http: HttpClient) {}

  private makeURL(endpoint: string) {
    return `${environment.api}${endpoint}`;
  }

  get<T>(endpoint: string, queryParams?: QueryParams): Observable<Response<T>> {
    return this._http.get<Response<T>>(this.makeURL(endpoint), {
      params: queryParams,
    });
  }

  getList<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<ListResponse<T>> {
    return this._http.get<ListResponse<T>>(this.makeURL(endpoint), {
      params: queryParams,
    });
  }

  delete<T>(
    endpoint: string,
    queryParams?: QueryParams
  ): Observable<Response<T>> {
    return this._http.delete<Response<T>>(this.makeURL(endpoint), {
      params: queryParams,
    });
  }

  post<T>(endpoint: string, body: unknown): Observable<Response<T>> {
    return this._http.post<Response<T>>(this.makeURL(endpoint), body);
  }

  put<T>(endpoint: string, body: unknown): Observable<Response<T>> {
    return this._http.put<Response<T>>(this.makeURL(endpoint), body);
  }
}
