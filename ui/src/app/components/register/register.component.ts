import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import { ConfirmedValidator } from 'src/app/utils/confirmed.validator';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends AuthComponent {

  public form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validator: ConfirmedValidator('password', 'password_confirmation')
  });
}
