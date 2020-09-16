import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

type Role = 'user' | 'manager' | 'admin';
type Payload = IRegisterPayload;

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface IRegisterResponse {
  access_token: string;
  user: IUser;
}

const { urlRoot } = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // GET requests

  public whoAmI(): Promise<IUser> {
    return this.get<IUser>(`${urlRoot}/whoami`);
  }


  // POST requests

  public register(payload: IRegisterPayload): Promise<IRegisterResponse> {
    return this.post<IRegisterResponse>(`${urlRoot}/register`, payload);
  }


  private get<T>(url: string, withCredentials = true): Promise<T> {
    return this.http.get<T>(url, { withCredentials }).toPromise();
  }

  private post<T>(url: string, data: Payload, withCredentials = true): Promise<T> {
    return this.http.post<T>(url, data, { withCredentials }).toPromise();
  }
}
