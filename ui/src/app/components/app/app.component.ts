import { Component, OnInit } from '@angular/core';

import { User, UsersApiService } from 'src/app/services/users-api.service';
import { UserService } from 'src/app/services/user.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animations/slide-in.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {

  constructor(private usersApi: UsersApiService, private userService: UserService) {}

  public loading = true;
  public user: User = null;

  async ngOnInit(): Promise<void> {

    this.userService.getObservable().subscribe(user => this.user = user);

    try {
      await this.usersApi.whoAmI();
    } finally {
      this.loading = false;
    }
  }

  public prepareRoute(outlet: RouterOutlet): void {
    return outlet
      && outlet.activatedRouteData
      && outlet.activatedRouteData.animation;
  }
}
