import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Genre } from '../../interfaces/Genre';
import { MatButtonModule } from '@angular/material/button';
import { GenreService } from '../../services/genre.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GenreModal } from '../genre-modal/genre-modal';

@Component({
  selector: 'app-table-of-genres',
  imports: [MatIconModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './table-of-genres.html',
  styleUrl: './table-of-genres.css',
})
export class TableOfGenres {
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  genreService = inject(GenreService);
  genres = toSignal<Genre[]>(this.genreService.getGenres() ?? []);

  private dialog = inject(MatDialog);

  openGenreModal(idGenre?: number) {
    const dialogRef = this.dialog.open(GenreModal, {
      width: '400px',
      data: {
        idGenre: idGenre,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Data received from modal:', result);
      }
    });
  }
}
