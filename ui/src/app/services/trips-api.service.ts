import { Injectable } from '@angular/core';
import { IPaginatedResponse, ApiService } from './api.service';

export interface ITrip {
  id: number;
  user_id: number;
  destination: string;
  start_date: string;
  end_date: string;
  days_left: number;
  comment: string | null;
}

type ICreateTripPayload = Omit<ITrip, 'id' | 'user_id'>;

type ListResponse = IPaginatedResponse<ITrip>;

@Injectable({
  providedIn: 'root'
})
export class TripsApiService extends ApiService {

  public list(): Promise<ListResponse> {
    return this.get<ListResponse>(`/trips`);
  }

  public create(payload: ICreateTripPayload): Promise<ITrip> {
    return this.post<ITrip, ICreateTripPayload>('/trips', payload);
  }
}
