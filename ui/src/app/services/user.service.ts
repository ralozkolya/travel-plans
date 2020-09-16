import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject<User>(null);
  private user: User = null;

  public subscribe(observer): Subscription {
    return this.subject.asObservable().subscribe(observer);
  }

  public setUser(user: User): void {
    this.user = user;
    this.subject.next(user);
  }

  public getUser(): User {
    return this.user;
  }
}
