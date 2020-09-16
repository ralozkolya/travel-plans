import { Component, OnInit } from '@angular/core';
import { TripsApiService, ITrip } from 'src/app/services/trips-api.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {

  public trips: ITrip[] = [];

  constructor(private tripsApi: TripsApiService) { }

  public ngOnInit(): void {
    this.retrieveTrips();
  }

  public async retrieveTrips(): Promise<void> {
    this.trips = (await this.tripsApi.list()).data;
  }

}
