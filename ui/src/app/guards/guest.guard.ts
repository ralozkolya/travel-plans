import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { UsersApiService } from '../services/users-api.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private usersApi: UsersApiService
  ) {}

  async canActivate(): Promise<boolean> {
    return !(this.userService.getUser()
      || await this.usersApi.whoAmI());
  }

}
