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

  public getBadgeClass(trip: ITrip): string {
    console.log(trip);
    return trip.days_left > 3
      ? 'badge-info'
      : trip.ongoing
        ? 'badge-success' : 'badge-danger';
  }

  public getBadgeLabel(trip: ITrip): string {
    return trip.ongoing ? 'Ongoing' : `${trip.days_left} days left`;
  }

}
