import { Injectable } from '@angular/core';
import { IPaginatedResponse, ApiService } from './api.service';

export interface ITrip {
  id: number;
  user_id: number;
  destination: string;
  start_date: string;
  end_date: string;
  comment: string | null;
}

type ListResponse = IPaginatedResponse<ITrip>;

@Injectable({
  providedIn: 'root'
})
export class TripsApiService extends ApiService {

  public list(): Promise<ListResponse> {
    return this.get<ListResponse>(`/trips`);
  }
}
