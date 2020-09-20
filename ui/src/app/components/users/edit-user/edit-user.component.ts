import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersApiService, User } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public user: User = null;
  public error: string;

  constructor(
    private usersApi: UsersApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async ({ id }) => {
      try {
        this.user = await this.usersApi.getUser(id);
      } catch (e) {
        this.error = 'Network error';
      }
    });
  }

}
