import { Component, OnInit } from '@angular/core';
import { TripsApiService, ITrip, TripListResponse } from 'src/app/services/trips-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips-home.component.html',
  styleUrls: ['./trips-home.component.scss']
})
export class TripsHomeComponent implements OnInit {

  public loading = false;

  public response: TripListResponse;
  public futureTrips: ITrip[] = [];
  public pastTrips: ITrip[] = [];

  constructor(
    private tripsApi: TripsApiService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.retrieveTrips(params.page || 1);
    });
  }

  public async retrieveTrips(page = 1): Promise<void> {
    this.loading = true;
    try {
      this.response = (await this.tripsApi.list(page));
      this.futureTrips = this.response.data.filter(trip => trip.ongoing);
      this.pastTrips = this.response.data.filter(trip => !trip.ongoing);
    } finally {
      this.loading = false;
    }
  }

}
