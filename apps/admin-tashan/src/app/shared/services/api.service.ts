import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/response.model';
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
    return `http://localhost:3000${endpoint}`;
  }

  get<T>(endpoint: string, queryParams?: any): Observable<ApiResponse<T>> {
    return this._http.get<ApiResponse<T>>(this.makeURL(endpoint), { params: queryParams });
  }

  delete(endpoint: string, queryParams?: any): Observable<any> {
    return this._http.delete(this.makeURL(endpoint), { params: queryParams });
  }

  post<T>(endpoint: string, body: any): Observable<ApiResponse<T>> {
    return this._http.post<ApiResponse<T>>(this.makeURL(endpoint), body);
  }

  put(endpoint: string, body?: any): Observable<any> {
    return this._http.put(this.makeURL(endpoint), body);
  }
}
