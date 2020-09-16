import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

type Role = 'user' | 'manager' | 'admin';
export type User = IUser | null;

interface IUser {
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

export interface IAuthResponse {
  access_token: string;
  user: IUser;
}

interface ILoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends ApiService {

  public whoAmI(): Promise<IUser> {
    return this.get<IUser>(`/whoami`);
  }

  public register(payload: IRegisterPayload): Promise<IAuthResponse> {
    return this.post<IAuthResponse, IRegisterPayload>(`/register`, payload);
  }

  public login(payload: ILoginPayload): Promise<IAuthResponse> {
    return this.post<IAuthResponse, ILoginPayload>(`/login`, payload);
  }

  public logout(): Promise<void> {
    return this.post<void>(`/logout`);
  }
}
