import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getObservable().subscribe(user => this.user = user);
  }
}
