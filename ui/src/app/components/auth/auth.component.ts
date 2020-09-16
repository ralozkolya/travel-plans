import { Component } from '@angular/core';
import { ApiService, IAuthReponse } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

type Method = 'login' | 'register';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public loading = false;
  public successMessage: string;
  public errors: string[] = [];

  public form: FormGroup;

  constructor(private api: ApiService,
              protected formBuilder: FormBuilder,
              private userService: UserService
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

  public async onSubmit(method: Method): Promise<void> {

    this.loading = true;
    this.errors = [];

    try {

      const response = await this.sendRequest(method);
      this.successMessage = 'Success! Redirecting...';
      this.userService.setUser(response.user);

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

  protected sendRequest(method: Method): Promise<IAuthReponse> {
    return this.api[method](this.form.value);
  }
}
