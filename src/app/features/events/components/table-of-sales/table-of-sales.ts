import { Component, inject, OnInit, signal } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../interfaces/Sale';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table-of-sales',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './table-of-sales.html',
  styleUrl: './table-of-sales.css',
})
export class TableOfSales implements OnInit {
  private salesService = inject(SalesService);
  sales = signal<Sale[]>([]);
  displayedColumns: string[] = ['saleId', 'title', 'email', 'dateEvent', 'quantity', 'total'];

  ngOnInit() {
    this.salesService.getSalesByDate().subscribe((response) => {
      this.sales.set(response.data);
    });
  }
}
