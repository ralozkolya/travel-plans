import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subject = new BehaviorSubject<User>(null);
  private listSubject = new BehaviorSubject<void>(undefined);

  public getObservable(): Observable<User> {
    return this.subject.asObservable();
  }

  public getListObservable(): Observable<void> {
    return this.listSubject.asObservable();
  }

  public setUser(user: User): void {
    this.subject.next(user);
  }

  public updateList(): void {
    this.listSubject.next();
  }
}
