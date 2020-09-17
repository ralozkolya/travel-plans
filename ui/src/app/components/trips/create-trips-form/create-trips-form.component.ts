import Bluebird from 'bluebird';

import { Component, Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../../base/form/form.component';
import { Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-trips-form',
  templateUrl: './create-trips-form.component.html',
  styleUrls: ['./create-trips-form.component.scss']
})
export class CreateTripsFormComponent extends FormComponent {

  @Output()
  public created = new EventEmitter<void>();

  public form = this.getFormGroup();

  public async onSubmit(): Promise<void> {
    await this.submit(() => this.trips.create(this.form.value));
    this.created.emit();
    this.reset();
  }

  private getFormGroup(): FormGroup {
    return this.formBuilder.group({
      destination: [ '', Validators.required ],
      start_date: [ '', Validators.required ],
      end_date: [ '', Validators.required ],
      comment: [ '' ],
    });
  }

  private async reset(): Promise<void> {
    this.form = this.getFormGroup();
    await Bluebird.delay(3000);
    this.successMessage = null;
  }

}
