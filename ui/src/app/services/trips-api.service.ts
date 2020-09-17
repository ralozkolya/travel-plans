import { Injectable } from '@angular/core';
import { IPaginatedResponse, ApiService } from './api.service';

export interface ITrip {
  id: number;
  user_id: number;
  destination: string;
  start_date: string;
  end_date: string;
  days_left: number;
  ongoing: boolean;
  comment: string | null;
}

type ICreateTripPayload = Omit<ITrip, 'id' | 'user_id'>;

export type TripListResponse = IPaginatedResponse<ITrip>;

@Injectable({
  providedIn: 'root'
})
export class TripsApiService extends ApiService {

  public list(page = 1): Promise<TripListResponse> {
    return this.get<TripListResponse>(`/trips`, { page: String(page) });
  }

  public create(payload: ICreateTripPayload): Promise<ITrip> {
    return this.post<ITrip, ICreateTripPayload>('/trips', payload);
  }
}
