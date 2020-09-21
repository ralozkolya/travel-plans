import { Injectable } from '@angular/core';

import { ApiService, IPaginatedResponse } from './api.service';
import { Roles } from '../enums/roles.enum';

export type Role = Roles.user | Roles.manager | Roles.admin;
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

export interface IUpdatePayload extends Partial<IRegisterPayload> {
  role?: Role;
}

interface IUpdatePasswordPayload {
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface ICreatePayload extends IRegisterPayload {
  role: Role;
}

export type UserListResponse = IPaginatedResponse<IUser>;

@Injectable({
  providedIn: 'root'
})
export class UsersApiService extends ApiService {

  public async whoAmI(): Promise<IUser> {
    const user = (await this.get<IUser>(`/whoami`)) || null;
    this.userService.setUser(user);
    return user;
  }

  public list(page = 1): Promise<UserListResponse> {
    return this.get<UserListResponse>('/users', { page: String(page) });
  }

  public getUser(id: number): Promise<IUser> {
    return this.get<IUser>(`/users/${id}`);
  }

  public create(payload: ICreatePayload): Promise<IUser> {
    return this.post<IUser, ICreatePayload>('/users', payload);
  }

  public update(id: number, payload: IUpdatePayload): Promise<void> {
    return this.patch<void, IUpdatePayload>(`/users/${id}`, payload);
  }

  public updatePassword(id: number, payload: IUpdatePasswordPayload): Promise<void> {
    return this.post<void, IUpdatePasswordPayload>(`/users/${id}/password`, payload);
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
