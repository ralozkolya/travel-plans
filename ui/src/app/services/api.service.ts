import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const { urlRoot } = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected urlRoot = urlRoot;

  constructor(protected http: HttpClient) {}

  protected get<T>(url: string, withCredentials = true): Promise<T> {
    return this.http.get<T>(url, { withCredentials }).toPromise();
  }

  protected post<T, U = null>(url: string, data: U = null, withCredentials = true): Promise<T> {
    return this.http.post<T>(url, data, { withCredentials }).toPromise();
  }
}
