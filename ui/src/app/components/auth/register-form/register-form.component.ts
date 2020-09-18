import Bluebird from 'bluebird';

import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormComponent } from '../../base/form/form.component';
import { ConfirmedValidator } from '../../../utils/confirmed.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent extends FormComponent {

  public form = this.formBuilder.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password_confirmation: ['', [ Validators.required, Validators.minLength(6) ]],
  }, {
    validator: ConfirmedValidator('password', 'password_confirmation')
  });

  public async onSubmit(): Promise<void> {
    await this.submit(this.send.bind(this));
    await Bluebird.delay(1500);
    this.router.navigateByUrl('/trips');
  }

  private async send(): Promise<void> {
    const response = await this.users.register(this.form.value);
    this.userService.setUser(response.user);
  }
}
