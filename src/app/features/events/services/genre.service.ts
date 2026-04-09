import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Genre } from '../interfaces/Genre';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  http = inject(HttpClient);
  apiUrl = environment.baseUrl;

  getGenres() {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }

  getGenreById(id: number) {
    return this.http.get<Genre>(`${this.apiUrl}/genres/${id}`);
  }

  createGenre(genre: Genre) {
    return this.http.post<Genre>(`${this.apiUrl}/genres`, genre);
  }

  updateGenre(id: number, genre: Genre) {
    return this.http.put<Genre>(`${this.apiUrl}/genres/${id}`, genre);
  }

  deleteGenre(id: number) {
    return this.http.delete<Genre>(`${this.apiUrl}/genres/${id}`);
  }
}
