import { Component } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { ApiService } from 'src/app/services/api.service';
import { ConfirmedValidator } from 'src/app/utils/confirmed.validator';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public loading = false;
  public successMessage: string;
  public errors: string[] = [];

  public registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validator: ConfirmedValidator('password', 'password_confirmation')
  });

  constructor(private api: ApiService,
              private formBuilder: FormBuilder,
              private userService: UserService
  ) { }

  public get controls(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  public getClass(key: string, includeFormControl = true): string[] {

    const classes = [];
    const control = this.registerForm.controls[key];

    if (includeFormControl) {
      classes.push('form-control');
    }

    if (!control.pristine) {
      classes.push(control.errors ? 'is-invalid' : 'is-valid');
    }

    return classes;
  }

  public async onSubmit(): Promise<void> {

    this.loading = true;
    this.errors = [];

    try {

      const response = await this.api.register(this.registerForm.value);
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

}
