import { Component, input } from '@angular/core';
import { EventCard } from '../event-card/event-card';
import { Event } from '../../interfaces/Event';

@Component({
  selector: 'app-list-of-events',
  imports: [EventCard],
  templateUrl: './list-of-events.html',
  styleUrl: './list-of-events.css',
})
export class ListOfEvents {
  events = input<Event[]>([]);
}
