import Bluebird from 'bluebird';

import { Component } from '@angular/core';
import { FormComponent } from '../../base/form/form.component';
import { Validators, FormGroup } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/utils/confirmed.validator';
import { RoleValidator } from 'src/app/utils/role.validator';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent extends FormComponent {

  public form = this.getFormGroup();

  public async onSubmit(): Promise<void> {
    await this.submit(() => this.users.create(this.form.value));
    this.userService.updateList();
    this.reset();
  }

  private getFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [ Validators.required ]],
      email: ['', [ Validators.required, Validators.email ]],
      role: [Roles.user, [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      password_confirmation: ['', [ Validators.required, Validators.minLength(6) ]],
    }, {
      validators: [
        RoleValidator('role'),
        ConfirmedValidator('password', 'password_confirmation')
      ]
    });
  }

  private async reset(): Promise<void> {
    this.form = this.getFormGroup();
    await Bluebird.delay(3000);
    this.successMessage = null;
  }

}
