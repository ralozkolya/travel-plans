import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private subject = new BehaviorSubject<void>(undefined);

  public getObservable(): Observable<void> {
    return this.subject.asObservable();
  }

  public update(): void {
    this.subject.next();
  }
}
