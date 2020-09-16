import { Component } from '@angular/core';
import { FormComponent } from '../../base/form/form.component';
import { Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/utils/confirmed.validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent extends FormComponent {

  public form = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validator: ConfirmedValidator('password', 'password_confirmation')
  });
}
