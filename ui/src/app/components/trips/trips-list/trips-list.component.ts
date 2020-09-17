import { Component, Input } from '@angular/core';
import { ITrip, TripsApiService } from 'src/app/services/trips-api.service';
import { TripService } from 'src/app/services/trip.service';

type Size = 'normal' | 'large' | 'small' | 'extra-small';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent {

  @Input()
  public trips: ITrip[];

  @Input()
  public size: Size = 'normal';

  constructor(
    private tripsApi: TripsApiService,
    private tripService: TripService
  ) {}

  public getBadgeClass(trip: ITrip): string {
    return trip.days_left > 3
      ? 'badge-info'
      : trip.ongoing
        ? 'badge-success' : 'badge-danger';
  }

  public getBadgeLabel(trip: ITrip): string {
    return trip.ongoing ? 'Ongoing' : `${trip.days_left} days left`;
  }

  public get em(): string {

    switch (this.size) {

      case 'large':
        return '1.25em';

      case 'small':
        return '.7em';

      case 'extra-small':
        return '.5em';

      default:
        return '1em';
    }
  }

  public async deleteTrip(id: number): Promise<void> {
    await this.tripsApi.remove(id);
    this.tripService.update();
  }

}
