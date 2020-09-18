import { Component, Input } from '@angular/core';

import { IUser, UsersApiService } from '../../../services/users-api.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  @Input()
  public users: IUser[];

  constructor(
    private usersApi: UsersApiService,
    private userService: UserService,
    private router: Router
  ) {}

  public async deleteUser(id: number): Promise<void> {
    await this.usersApi.remove(id);
    this.userService.updateList();
  }

  public editUser(id: number): void {
    this.router.navigateByUrl(`/users/${id}`);
  }
}
