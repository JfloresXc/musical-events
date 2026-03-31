import { Component, inject, OnInit, signal } from '@angular/core';
import { ListOfEvents } from '../../../events/components/list-of-events/list-of-events';
import { EventService } from '../../../events/services/event.service';
import { Event } from '../../../events/interfaces/Event';

@Component({
  selector: 'app-home',
  imports: [ListOfEvents],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  eventService = inject(EventService);
  events = signal<Event[]>([]);

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events.set(response.data ?? []);
      },
      error: (error) => {
        console.log('Esto es un error: ' + error.message);
      },
    });
  }
}
