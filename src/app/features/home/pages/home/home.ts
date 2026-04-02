import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ListOfEvents } from '../../../events/components/list-of-events/list-of-events';
import { EventService } from '../../../events/services/event.service';
import { Event } from '../../../events/interfaces/Event';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ListOfEvents,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAnchor,
    FormsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  eventService = inject(EventService);
  events = signal<Event[]>([]);
  searchModel = model<string>('');

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.eventService.getEvents(this.searchModel()).subscribe({
      next: (response) => {
        this.events.set(response.data ?? []);
      },
      error: (error) => {
        console.log('Esto es un error: ' + error.message);
      },
    });
  }
}
