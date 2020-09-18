import Bluebird from 'bluebird';

import { Component, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { FormComponent } from '../../base/form/form.component';
import { IUser } from 'src/app/services/users-api.service';
import { ConfirmedValidator } from 'src/app/utils/confirmed.validator';
import { expandYAnimation } from 'src/app/animations/expand.animation';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
  animations: [ expandYAnimation ]
})
export class EditPasswordComponent extends FormComponent {

  @Input()
  public user: IUser;

  public form = this.getFormGroup();

  public async onSubmit(): Promise<void> {
    await this.submit(() => this.users.update(this.user.id, this.form.value));
    this.reset();
  }

  private async reset(): Promise<void> {
    this.form = this.getFormGroup();
    await Bluebird.delay(3000);
    this.successMessage = null;
  }

  private getFormGroup(): FormGroup {
    return this.formBuilder.group({
      password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
      password_confirmation: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
  }

}
