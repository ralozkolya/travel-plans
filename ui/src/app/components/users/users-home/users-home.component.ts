import { Component, OnInit } from '@angular/core';

import { UserListResponse, UsersApiService } from '../../../services/users-api.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

  public loading = false;
  public page = 1;

  public response: UserListResponse;

  constructor(
    private usersApi: UsersApiService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params.page || 1;
      this.userService.getListObservable().subscribe(() => this.retrieveUsers());
    });
  }

  public async retrieveUsers(): Promise<void> {
    this.loading = true;
    try {
      this.response = (await this.usersApi.list(this.page));
    } finally {
      this.loading = false;
    }
  }

}
