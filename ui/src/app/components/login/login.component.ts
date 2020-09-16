import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends AuthComponent {

  public form = this.formBuilder.group({
    email: [ '', Validators.required ],
    password: [ '', Validators.required ],
  });

}
