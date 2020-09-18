import { Injectable } from '@angular/core';

import { ApiService, IPaginatedResponse } from './api.service';

type Role = 'user' | 'manager' | 'admin';
export type User = IUser | null;

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

export interface IAuthResponse {
  access_token: string;
  user: IUser;
}

interface ILoginPayload {
  email: string;
  password: string;
}

export type UserListResponse = IPaginatedResponse<IUser>;

interface IUpdatePayload extends Partial<IRegisterPayload> {
  role?: Role;
}

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends ApiService {

  public whoAmI(): Promise<IUser> {
    return this.get<IUser>(`/whoami`);
  }

  public list(page = 1): Promise<UserListResponse> {
    return this.get<UserListResponse>('/users', { page: String(page) });
  }

  public getUser(id: number): Promise<IUser> {
    return this.get<IUser>(`/users/${id}`);
  }

  public update(id: number, payload: IUpdatePayload): Promise<void> {
    return this.patch<void, IUpdatePayload>(`/users/${id}`, payload);
  }

  public remove(id: number): Promise<void> {
    return this.delete<void>(`/users/${id}`);
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
