import { Component, Input, OnInit } from '@angular/core';

import { IUser } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: IUser | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.subscribe(user => this.user = user);
  }

}
