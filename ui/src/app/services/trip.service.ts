import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private subject = new BehaviorSubject<void>(undefined);

  public subscribe(observer): Subscription {
    return this.subject.asObservable().subscribe(observer);
  }

  public update(): void {
    this.subject.next();
  }
}
