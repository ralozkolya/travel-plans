import { Component, OnInit } from '@angular/core';

import { User, UsersApiService } from 'src/app/services/users-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: User = null;

  constructor(private userService: UserService, private usersApi: UsersApiService) {}

  public ngOnInit(): void {
    this.userService.subscribe(user => this.user = user);
  }

  public logout(): boolean {
    this.usersApi.logout().then(() => {
      this.userService.setUser(null);
    });
    return false;
  }

}
