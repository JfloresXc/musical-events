import { Component, inject, OnInit, signal } from '@angular/core';
import { Event } from '../../interfaces/Event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BuyTicket } from '../../components/buy-ticket/buy-ticket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  imports: [MatIcon, MatButtonModule, DatePipe],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event = signal<Event | null>(null);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe((event) => {
      this.event.set(event);
    });
  }

  buyTicket() {
    const dialogRef = this.dialog.open(BuyTicket, {
      data: {
        idEvent: this.event()?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Entrada comprada correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    });
  }
}
