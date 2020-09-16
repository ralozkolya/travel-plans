import { Component, Input } from '@angular/core';
import { ITrip } from 'src/app/services/trips-api.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent {

  @Input()
  public trips: ITrip[];

}
