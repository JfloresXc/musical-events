import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { Event } from '../../interfaces/Event';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  imports: [MatCardModule, MatChipsModule, RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  event = input<Event>();
}
