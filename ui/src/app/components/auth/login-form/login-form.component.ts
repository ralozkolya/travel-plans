import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../base/form/form.component';
import { Validators } from '@angular/forms';

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

}
