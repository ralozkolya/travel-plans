import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: User = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.subscribe(user => this.user = user);
  }

}
