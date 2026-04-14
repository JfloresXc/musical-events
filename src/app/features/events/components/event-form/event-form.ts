import { Component, inject, OnInit, signal } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { T } from '@angular/cdk/keycodes';

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
    MatSnackBarModule,
  ],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm implements OnInit {
  route = inject(ActivatedRoute);
  idEvent = this.route.snapshot.paramMap.get('id');
  eventService = inject(EventService);
  snackBar = inject(MatSnackBar);
  isAdd = signal<boolean>(this.idEvent === 'new');

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    // genre: new FormControl('', Validators.required),
    dateEvent: new FormControl('', Validators.required),
    unitPrice: new FormControl(0, Validators.required),
    // status: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    place: new FormControl('', Validators.required),
    extendedDescription: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    genreId: new FormControl(0, Validators.required),
    timeEvent: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });

  genreService = inject(GenreService);
  genres = toSignal(this.genreService.getGenres());

  imagePreview = signal<string | null>(null);

  ngOnInit(): void {
    if (!this.isAdd()) {
      this.eventService.getEventById(this.idEvent!).subscribe((event) => {
        this.form.patchValue({
          title: event.title,
          // genre: event.genre,
          dateEvent: event.dateEvent,
          unitPrice: event?.unitPrice ?? 0,
          // status: event.status,
          capacity: event.capacity,
          place: event.place,
          extendedDescription: event.extendedDescription,
          description: event.description,
          genreId: event.genreId,
          timeEvent: event.timeEvent,
        });

        if (event.imageUrl) {
          this.imagePreview.set(event.imageUrl);
        }
      });
    }
  }

  cancel() {
    console.log('Navegamos a la lista de eventos');
  }

  saveEvent() {
    const formData = new FormData();
    formData.append('title', this.form.value.title!);
    // formData.append('genre', this.form.value.genre!);
    // The value 'Mon Apr 13 2026 00:00:00 GMT-0500
    //
    const date = this.formatDate(new Date(this.form.value.dateEvent!));
    formData.append('dateEvent', date);
    formData.append('unitPrice', this.form.value.unitPrice!.toString());
    // formData.append('status', this.form.value.status!);
    formData.append('capacity', this.form.value.capacity!.toString());
    formData.append('place', this.form.value.place!);
    formData.append('extendedDescription', this.form.value.extendedDescription!);
    formData.append('description', this.form.value.description!);
    formData.append('genreId', this.form.value.genreId!.toString());
    formData.append('timeEvent', this.form.value.timeEvent!);

    if (this.form.value.image) {
      formData.append('image', this.form.value.image);
    } else {
      formData.append('image', '');
    }

    if (!this.isAdd()) {
      this.eventService.updateEvent(Number(this.idEvent), formData).subscribe(() => {
        this.snackBar.open('Evento actualizado correctamente', 'Cerrar', {
          duration: 2000,
        });
      });
    } else {
      this.eventService.createEvent(formData).subscribe(() => {
        this.snackBar.open('Evento creado correctamente', 'Cerrar', {
          duration: 2000,
        });
      });
    }
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagePreview.set(URL.createObjectURL(file));

      this.form.patchValue({
        image: file,
      });
    }
  }
}
