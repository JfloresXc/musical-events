import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/Event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table-of-events',
  imports: [MatIcon, MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './table-of-events.html',
  styleUrl: './table-of-events.css',
})
export class TableOfEvents implements OnInit {
  displayedColumns: string[] = [
    'imageUrl',
    'title',
    'genre',
    'dateEvent',
    'unitPrice',
    'status',
    'actions',
  ];
  events = signal<Event[]>([]);
  eventService = inject(EventService);

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((events) => {
      this.events.set(events.data);
    });
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }
}
