import { Component, OnInit } from '@angular/core';
import { TripsApiService, ITrip } from 'src/app/services/trips-api.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips-home.component.html',
  styleUrls: ['./trips-home.component.scss']
})
export class TripsHomeComponent implements OnInit {

  public futureTrips: ITrip[] = [];
  public pastTrips: ITrip[] = [];

  constructor(private tripsApi: TripsApiService) { }

  public ngOnInit(): void {
    this.retrieveTrips();
  }

  public async retrieveTrips(): Promise<void> {
    const trips = (await this.tripsApi.list()).data;
    this.futureTrips = trips.filter(trip => trip.days_left);
    this.pastTrips = trips.filter(trip => !trip.days_left);
  }

}
