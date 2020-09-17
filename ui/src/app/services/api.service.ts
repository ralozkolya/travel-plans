import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';

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

  constructor(
    protected http: HttpClient,
    private userService: UserService
  ) {}

  protected get<T>(url: string, params: { [ key: string ]: string } = {}, withCredentials = true): Promise<T> {
    url = this.urlRoot + url;
    const responsePromise = this.http.get<T>(url, { withCredentials, params }).toPromise();
    return this.handleResponse<T>(responsePromise);
  }

  protected post<T, U = null>(url: string, data: U = null, withCredentials = true): Promise<T> {
    url = this.urlRoot + url;
    const responsePromise = this.http.post<T>(url, data, { withCredentials }).toPromise();
    return this.handleResponse<T>(responsePromise);
  }

  protected delete<T>(url: string, withCredentials = true): Promise<T> {
    url = this.urlRoot + url;
    const responsePromise = this.http.delete<T>(url, { withCredentials }).toPromise();
    return this.handleResponse<T>(responsePromise);
  }

  private async handleResponse<T>(response: Promise<T>): Promise<T> {
    try {
      return await response;
    } catch (e) {
      if (401 === e.status) {
        this.userService.setUser(null);
      }
      throw e;
    }
  }
}
