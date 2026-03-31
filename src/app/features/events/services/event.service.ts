import { inject, Injectable } from '@angular/core';
import { Event, EventResponse } from '../interfaces/Event';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl = environment.baseUrl;
  http = inject(HttpClient);

  getEvents(): Observable<EventResponse> {
    return this.http.get<EventResponse>(`${this.apiUrl}/concerts`);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/concerts/${id}`);
  }
}
