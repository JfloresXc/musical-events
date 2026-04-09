import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from '../../services/genre.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/Event';

@Component({
  selector: 'app-event-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {
  route = inject(ActivatedRoute);
  idEvent = this.route.snapshot.paramMap.get('id');
  eventService = inject(EventService);

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    dateEvent: new FormControl('', Validators.required),
    unitPrice: new FormControl(0, Validators.required),
    status: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    place: new FormControl('', Validators.required),
    extendedDescription: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    genreId: new FormControl(0, Validators.required),
  });

  genreService = inject(GenreService);
  genres = toSignal(this.genreService.getGenres());

  ngOnInit(): void {
    if (this.idEvent) {
      this.eventService.getEventById(this.idEvent).subscribe((event) => {
        this.form.patchValue({
          title: event.title,
          genre: event.genre,
          dateEvent: event.dateEvent,
          unitPrice: event?.unitPrice ?? 0,
          status: event.status,
          capacity: event.capacity,
          place: event.place,
          extendedDescription: event.extendedDescription,
          description: event.description,
          genreId: event.genreId,
        });
      });
    }
  }

  cancel() {
    console.log('Navegamos a la lista de eventos');
  }

  saveEvent() {
    const event: Event = {
      title: this.form.value.title || '',
      genre: this.form.value.genre || '',
      dateEvent: this.form.value.dateEvent || '',
      unitPrice: this.form.value.unitPrice || 0,
      status: this.form.value.status || '',
      capacity: this.form.value.capacity || 0,
      place: this.form.value.place || '',
      extendedDescription: this.form.value.extendedDescription || '',
      description: this.form.value.description || '',
      genreId: this.form.value.genreId || 0,
    };

    if (this.idEvent) {
      event.id = Number(this.idEvent);
      this.eventService.updateEvent(event).subscribe(() => {
        console.log('Evento actualizado');
      });
    } else {
      this.eventService.createEvent(event).subscribe(() => {
        console.log('Evento creado');
      });
    }
  }
}
