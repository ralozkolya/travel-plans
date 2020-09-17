import Bluebird from 'bluebird';

import { Component } from '@angular/core';
import { FormComponent } from '../../base/form/form.component';
import { Validators, FormGroup } from '@angular/forms';
import { DateRangeValidator } from 'src/app/utils/date-range.validator';

@Component({
  selector: 'app-create-trips-form',
  templateUrl: './create-trips-form.component.html',
  styleUrls: ['./create-trips-form.component.scss']
})
export class CreateTripsFormComponent extends FormComponent {

  public form = this.getFormGroup();

  public async onSubmit(): Promise<void> {
    await this.submit(() => this.trips.create(this.form.value));
    this.tripService.update();
    this.reset();
  }

  private getFormGroup(): FormGroup {
    return this.formBuilder.group({
      destination: [ '', Validators.required ],
      start_date: [ '', Validators.required ],
      end_date: [ '', Validators.required ],
      comment: [ '' ],
    }, {
      validator: DateRangeValidator('start_date', 'end_date')
    });
  }

  private async reset(): Promise<void> {
    this.form = this.getFormGroup();
    await Bluebird.delay(3000);
    this.successMessage = null;
  }

}
