import { Component, inject, OnInit, signal } from '@angular/core';
import { Event } from '../../interfaces/Event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-detail',
  imports: [],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event = signal<Event | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe((event) => {
      this.event.set(event);
    });
  }
}
