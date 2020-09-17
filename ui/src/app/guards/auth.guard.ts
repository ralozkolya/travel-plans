import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.userService.getObservable().pipe(
      map(user => {
        return !!user;
      })
    );
  }

}
