import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { DateRangeValidator } from 'src/app/utils/date-range.validator';
import { ITrip } from 'src/app/services/trips-api.service';
import { FormComponent } from '../../base/form/form.component';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent extends FormComponent implements OnInit {

  public trip: ITrip;
  public error: string;

  public form: FormGroup;

  public ngOnInit(): void {
    this.route.params.subscribe(async ({ id }) => {

      try {
        this.trip = await this.trips.getTrip(id);
        this.form = this.formBuilder.group({
          destination: [ this.trip.destination, Validators.required ],
          start_date: [ this.trip.start_date, Validators.required ],
          end_date: [ this.trip.end_date, Validators.required ],
          comment: [ this.trip.comment ],
        }, {
          validator: DateRangeValidator('start_date', 'end_date')
        });
      } catch (e) {
        this.error = 'Network error';
      }
    });
  }

  public async onSubmit(): Promise<void> {
    await this.submit(() => this.trips.update(this.trip.id, this.form.value));
    this.router.navigateByUrl('/trips');
  }

}
