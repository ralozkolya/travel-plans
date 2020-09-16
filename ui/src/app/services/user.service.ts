import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IUser } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject<IUser | null>(null);

  public subscribe(observer): Subscription {
    return this.subject.asObservable().subscribe(observer);
  }

  public setUser(user: IUser | null): void {
    this.subject.next(user);
  }
}
