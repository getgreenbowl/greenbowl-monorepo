import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


type QueryParams = HttpParams | {
  [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
}

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
    return `https://jsonplaceholder.typicode.com${endpoint}`;
  }

  get<T>(endpoint: string, queryParams?: QueryParams): Observable<T> {
    return this._http.get<T>(this.makeURL(endpoint), { params: queryParams });
  }

  delete<T>(endpoint: string, queryParams?: QueryParams): Observable<T> {
    return this._http.delete<T>(this.makeURL(endpoint), { params: queryParams });
  }

  post<T>(endpoint: string, body: unknown): Observable<T> {
    return this._http.post<T>(this.makeURL(endpoint), body);
  }

  put<T>(endpoint: string, body: unknown): Observable<T> {
    return this._http.put<T>(this.makeURL(endpoint), body);
  }
}
