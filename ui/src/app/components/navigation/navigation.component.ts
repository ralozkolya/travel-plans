import { Component, OnInit } from '@angular/core';

import { User, UsersApiService } from 'src/app/services/users-api.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: User = null;

  constructor(
    private userService: UserService,
    private usersApi: UsersApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.userService.getObservable().subscribe(user => this.user = user);
  }

  public logout(): boolean {
    this.usersApi.logout().then(() => {
      this.userService.setUser(null);
      this.router.navigateByUrl('/');
    });
    return false;
  }

}
