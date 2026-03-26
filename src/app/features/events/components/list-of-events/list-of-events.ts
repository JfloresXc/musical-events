import { Component } from '@angular/core';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-list-of-events',
  imports: [EventCard],
  templateUrl: './list-of-events.html',
  styleUrl: './list-of-events.css',
})
export class ListOfEvents {}
