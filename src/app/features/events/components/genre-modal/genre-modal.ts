import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface DialogData {
  idGenre?: number;
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

  ngOnInit() {
    console.log('ID received from table:', this.data?.idGenre);
  }

  genreForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl(true),
  });

  onSave() {
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
