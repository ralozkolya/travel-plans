import Bluebird from 'bluebird';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormComponent } from '../../base/form/form.component';
import { IUser } from 'src/app/services/users-api.service';
import { expandYAnimation } from 'src/app/animations/expand.animation';

@Component({
  selector: 'app-edit-name-role',
  templateUrl: './edit-name-role.component.html',
  styleUrls: ['./edit-name-role.component.scss'],
  animations: [ expandYAnimation ]
})
export class EditNameRoleComponent extends FormComponent implements OnInit {

  @Input()
  public user: IUser = null;

  public form;

  public ngOnInit(): void {
    this.form = this.getFormGroup();
  }

  public async onSubmit(): Promise<void> {
    await this.submit(() => this.users.update(this.user.id, this.form.value));
    this.reset();
  }

  private async reset(): Promise<void> {
    this.user.name = this.form.value.name;
    this.user.role = this.form.value.role;
    this.form = this.getFormGroup();
    await Bluebird.delay(3000);
    this.successMessage = null;
  }

  private getFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(this.user.name, [ Validators.required ]),
      role: new FormControl(this.user.role, [ Validators.required ]),
    });
  }

}
