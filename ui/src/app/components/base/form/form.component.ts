import { Component } from '@angular/core';
import { UsersApiService } from 'src/app/services/users-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TripsApiService } from 'src/app/services/trips-api.service';
import { TripService } from 'src/app/services/trip.service';

export type EndPoint = 'users.login' | 'users.register' | 'trips.create';

@Component({
  selector: 'app-auth',
  template: ''
})
export class FormComponent {

  public loading = false;
  public successMessage: string;
  public errors: string[] = [];

  public form: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected userService: UserService,
    protected router: Router,
    protected users: UsersApiService,
    protected trips: TripsApiService,
    protected tripService: TripService
  ) {}

  public getClass(key: string, includeFormControl = true): string[] {

    const classes = [];
    const control = this.form.controls[key];

    if (includeFormControl) {
      classes.push('form-control');
    }

    if (!control.pristine) {
      classes.push(control.errors ? 'is-invalid' : 'is-valid');
    }

    return classes;
  }

  public async submit<T>(callback: () => Promise<T>): Promise<void> {

    this.loading = true;
    this.errors = [];

    try {

      await callback();
      this.successMessage = 'Success!';

    } catch (e) {

      if (e.error) {
        const errors: string[] = [];
        Object.keys(e.error).forEach(key => {
          const array = Array.isArray(e.error[key]) ? e.error[key] : [ e.error[key] ];
          errors.push.apply(errors, array);
        });
        this.errors = errors;
      } else {
        this.errors = [ 'Unexpected error occured' ];
      }

      throw e;
    } finally {
      this.loading = false;
    }
  }

  public get shouldDisable(): boolean {
    return this.loading || !!this.successMessage || !this.form.valid;
  }
}
