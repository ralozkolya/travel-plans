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

type ITripPayload = Omit<ITrip, 'id' | 'user_id' | 'days_left' | 'ongoing'>;

export type TripListResponse = IPaginatedResponse<ITrip>;

@Injectable({
  providedIn: 'root'
})
export class TripsApiService extends ApiService {

  public list(page = 1, q: string = null): Promise<TripListResponse> {

    const params: { page: string, q?: string } = { page: String(page) };

    if (q) {
      params.q = q;
    }

    return this.get<TripListResponse>(`/trips`, params);
  }

  public getTrip(id: number): Promise<ITrip> {
    return this.get<ITrip>(`/trips/${id}`);
  }

  public create(payload: ITripPayload): Promise<ITrip> {
    return this.post<ITrip, ITripPayload>('/trips', payload);
  }

  public update(id: number, payload: ITripPayload): Promise<ITrip> {
    return this.patch<ITrip, ITripPayload>(`/trips/${id}`, payload);
  }

  public remove(id: number): Promise<void> {
    return super.delete<void>(`/trips/${id}`);
  }
}
