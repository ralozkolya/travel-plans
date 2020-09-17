import { Component, OnInit } from '@angular/core';
import { TripsApiService, ITrip, TripListResponse } from 'src/app/services/trips-api.service';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips-home.component.html',
  styleUrls: ['./trips-home.component.scss']
})
export class TripsHomeComponent implements OnInit {

  public loading = false;
  public page = 1;

  public response: TripListResponse;
  public futureTrips: ITrip[] = [];
  public pastTrips: ITrip[] = [];

  constructor(
    private tripsApi: TripsApiService,
    private tripService: TripService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params.page || 1;
      this.tripService.getObservable().subscribe(() => this.retrieveTrips());
    });
  }

  public async retrieveTrips(): Promise<void> {
    this.loading = true;
    try {
      this.response = (await this.tripsApi.list(this.page));
      this.futureTrips = this.response.data.filter(trip => trip.ongoing || trip.days_left);
      this.pastTrips = this.response.data.filter(trip => !trip.ongoing && !trip.days_left);
    } finally {
      this.loading = false;
    }
  }

}
