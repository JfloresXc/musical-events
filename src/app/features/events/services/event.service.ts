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

  getEvents(search?: string): Observable<EventResponse> {
    return this.http.get<EventResponse>(`${this.apiUrl}/concerts`, {
      params: {
        title: search ?? '',
      },
    });
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/concerts/${id}`);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/concerts/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/concerts`, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/concerts/${event.id}`, event);
  }
}
