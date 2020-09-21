import { Component, Input } from '@angular/core';

import { IUser, UsersApiService } from '../../../services/users-api.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Roles } from 'src/app/enums/roles.enum';

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

  public canEdit(target: IUser): boolean {
    const user = this.userService.getUser();
    return user.role === Roles.admin
      || (user.role === Roles.manager && target.role === Roles.user);
  }
}
