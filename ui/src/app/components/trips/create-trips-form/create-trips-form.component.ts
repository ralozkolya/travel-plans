import { Component } from '@angular/core';
import { FormComponent } from '../../base/form/form.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-trips-form',
  templateUrl: './create-trips-form.component.html',
  styleUrls: ['./create-trips-form.component.scss']
})
export class CreateTripsFormComponent extends FormComponent {

  public form = this.formBuilder.group({
    destination: [ '', Validators.required ],
    start_date: [ '', Validators.required ],
    end_date: [ '', Validators.required ],
    comment: [ '' ],
  });

}
