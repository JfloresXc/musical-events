import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-event-card',
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {}
