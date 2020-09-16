import { Component, OnInit } from '@angular/core';

import { IUser, ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private api: ApiService, private userService: UserService) {}

  public loading = true;
  public user: IUser | null = null;

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.api.whoAmI();
      this.userService.setUser(this.user);
    } finally {
      this.loading = false;
    }

    this.userService.subscribe(user => this.user = user);
  }
}
