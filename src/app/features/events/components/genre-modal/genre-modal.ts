import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../interfaces/Genre';

interface DialogData {
  idGenre?: number;
  name?: string;
  status?: boolean;
}

@Component({
  selector: 'app-genre-modal',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './genre-modal.html',
  styleUrl: './genre-modal.css',
})
export class GenreModal implements OnInit {
  data = inject<DialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<GenreModal>);
  genreService = inject(GenreService);

  ngOnInit() {
    if (this.data?.idGenre) {
      this.genreForm.patchValue({
        name: this.data.name,
        status: this.data.status,
      });
    }
  }

  genreForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl(true),
  });

  onSave() {
    const idGenre = this.data?.idGenre;
    const genre: Genre = {
      id: idGenre!,
      name: this.genreForm.value.name ?? '',
      status: this.genreForm.value.status ?? true,
    };

    if (idGenre) {
      this.genreService.updateGenre(idGenre, genre).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error updating genre:', error);
        },
      });
    } else {
      this.genreService.createGenre(genre).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error creating genre:', error);
        },
      });
    }

    if (this.genreForm.valid) {
      this.dialogRef.close({
        ...this.genreForm.value,
        id: this.data?.idGenre,
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
