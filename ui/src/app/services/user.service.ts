import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject<User>(null);

  public subscribe(observer): Subscription {
    return this.subject.asObservable().subscribe(observer);
  }

  public setUser(user: User): void {
    this.subject.next(user);
  }
}
