import { Component, OnInit } from '@angular/core';

import { User, ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: User = null;

  constructor(private userService: UserService, private api: ApiService) {}

  public ngOnInit(): void {
    this.userService.subscribe(user => this.user = user);
  }

  public async logout(): Promise<void> {
    await this.api.logout();
    this.userService.setUser(null);
  }

}
