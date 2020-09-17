import Bluebird from 'bluebird';

import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormComponent, EndPoint } from '../../base/form/form.component';
import { IAuthResponse } from 'src/app/services/users-api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends FormComponent {

  public form = this.formBuilder.group({
    email: [ '', Validators.required ],
    password: [ '', Validators.required ],
  });

  public async onSubmit(): Promise<void> {
    await this.submit(this.send.bind(this));
    await Bluebird.delay(1500);
    this.router.navigateByUrl('/trips');
  }

  private async send(): Promise<void> {
    const response = await this.users.login(this.form.value);
    this.userService.setUser(response.user);
  }

}
