import Bluebird from 'bluebird';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormComponent } from '../../base/form/form.component';
import { IUser, User, IUpdatePayload } from 'src/app/services/users-api.service';
import { expandYAnimation } from 'src/app/animations/expand.animation';
import { Roles } from 'src/app/enums/roles.enum';

@Component({
  selector: 'app-edit-name-role',
  templateUrl: './edit-name-role.component.html',
  styleUrls: ['./edit-name-role.component.scss'],
  animations: [ expandYAnimation ]
})
export class EditNameRoleComponent extends FormComponent implements OnInit {

  @Input()
  public user: IUser = null;

  public Roles = Roles;

  public form;

  public loggedInUser: User;

  public ngOnInit(): void {
    this.userService.getObservable().subscribe(user => {
      this.loggedInUser = user;
      this.form = this.getFormGroup();
    });
  }

  public async onSubmit(): Promise<void> {

    const payload: IUpdatePayload = {
      name: this.form.value.name,
      role: this.form.value.role,
    };

    if (payload.role && typeof payload.role === 'boolean') {
      payload.role = Roles.manager;
    }

    await this.submit(() => this.users.update(this.user.id, payload));
    this.users.whoAmI();
    this.reset();
  }

  public get showRoleSelect(): boolean {
    return this.loggedInUser.role === Roles.admin;
  }

  public get showRoleCheckbox(): boolean {
    return this.loggedInUser.role === Roles.manager
      && this.user.role === Roles.user;
  }

  private async reset(): Promise<void> {

    this.user.name = this.form.value.name;

    if (this.loggedInUser?.role !== Roles.user) {
      this.user.role = this.form.value.role;
    }

    this.form = this.getFormGroup();
    await Bluebird.delay(3000);
    this.successMessage = null;
  }

  private getFormGroup(): FormGroup {

    const group: { name: FormControl, role?: FormControl } = {
      name: new FormControl(this.user.name, [ Validators.required ]),
    };

    if (this.loggedInUser?.role === Roles.admin) {
      group.role = new FormControl(this.user.role, [ Validators.required ]);
    } else {
      group.role = new FormControl('');
    }

    return this.formBuilder.group(group);
  }

}
