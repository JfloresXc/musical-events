import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table-of-events',
  imports: [MatIcon, MatTableModule],
  templateUrl: './table-of-events.html',
  styleUrl: './table-of-events.css',
})
export class TableOfEvents {
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  events = signal<Event[]>([]);
}
