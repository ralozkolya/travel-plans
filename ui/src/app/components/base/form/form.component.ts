import Bluebird from 'bluebird';

import { Component } from '@angular/core';
import { UsersApiService, IAuthReponse } from 'src/app/services/users-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TripsApiService } from 'src/app/services/trips-api.service';

type EndPoint = 'users.login' | 'users.register' | 'trips.create';

@Component({
  selector: 'app-auth',
  template: ''
})
export class FormComponent {

  public loading = false;
  public successMessage: string;
  public errors: string[] = [];

  public form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              private users: UsersApiService,
              private trips: TripsApiService,
              private userService: UserService,
              private router: Router
  ) { }

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

  public async onSubmit(method: EndPoint): Promise<void> {

    this.loading = true;
    this.errors = [];

    try {

      const response = await this.sendRequest(method);
      this.successMessage = 'Success! Redirecting...';
      this.userService.setUser(response.user);

      await Bluebird.delay(1500);

      this.router.navigateByUrl('trips');

    } catch (e) {

      this.loading = false;

      if (e.error) {
        const errors: string[] = [];
        Object.keys(e.error).forEach(key => {
          errors.push.apply(errors, e.error[key]);
        });
        this.errors = errors;
      } else {
        this.errors = [ 'Unexpected error occured' ];
      }
    }
  }

  protected sendRequest(endpoint: EndPoint): Promise<IAuthReponse> {
    const [ api, method ] = endpoint.split('.');
    return this[api][method](this.form.value);
  }
}
