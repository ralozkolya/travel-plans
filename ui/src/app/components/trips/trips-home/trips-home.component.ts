import { Component, OnInit } from '@angular/core';
import { TripsApiService, ITrip, TripListResponse } from 'src/app/services/trips-api.service';
import { ActivatedRoute } from '@angular/router';
import { TripService } from 'src/app/services/trip.service';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

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

  public form = this.formBuilder.group({
    q: new FormControl('')
  });

  constructor(
    private tripsApi: TripsApiService,
    private tripService: TripService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = params.page || 1;
      this.tripService.getObservable().subscribe(() => {
        this.retrieveTrips();
        this.retrievePastTrips();
      });
    });

    this.retrievePastTrips();

    this.form.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(this.retrieveTrips.bind(this));
  }

  public async retrieveTrips(): Promise<void> {
    this.loading = true;
    try {
      this.response = (await this.tripsApi.list(this.page, this.form.value.q));
      this.futureTrips = this.response.data;
    } finally {
      this.loading = false;
    }
  }

  public async retrievePastTrips(): Promise<void> {
    this.pastTrips = await this.tripsApi.listPast();
  }

}
