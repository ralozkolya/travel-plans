import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

export interface IPaginatedResponse<T> {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
  next_page_url: string;
  prev_page_url: string;
  first_page_url: string;
  last_page_url: string;
  path: string;
  data: T[];
}

const { urlRoot } = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected urlRoot = urlRoot;

  constructor(protected http: HttpClient) {}

  protected get<T>(url: string, params: { [ key: string ]: string } = {}, withCredentials = true): Promise<T> {
    url = this.urlRoot + url;
    return this.http.get<T>(url, { withCredentials, params }).toPromise();
  }

  protected post<T, U = null>(url: string, data: U = null, withCredentials = true): Promise<T> {
    url = this.urlRoot + url;
    return this.http.post<T>(url, data, { withCredentials }).toPromise();
  }
}
