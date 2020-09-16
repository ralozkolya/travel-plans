import { Component, OnInit } from '@angular/core';

import { User, UsersApiService } from 'src/app/services/users-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private usersApi: UsersApiService, private userService: UserService) {}

  public loading = true;
  public user: User = null;

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.usersApi.whoAmI();
      this.userService.setUser(this.user);
    } finally {
      this.loading = false;
    }

    this.userService.subscribe(user => this.user = user);
  }
}
