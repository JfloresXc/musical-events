import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SalesService } from '../../services/sales.service';
import { SaleRequest } from '../../interfaces/SaleRequest';

interface DialogData {
  idEvent?: number;
  ticketsQuantity?: number;
}

@Component({
  selector: 'app-buy-ticket',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './buy-ticket.html',
  styleUrl: './buy-ticket.css',
})
export class BuyTicket {
  data = inject<DialogData>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<BuyTicket>);
  salesService = inject(SalesService);

  saleForm = new FormGroup({
    ticketsQuantity: new FormControl(0, Validators.required),
  });

  onSave() {
    const sale: SaleRequest = {
      concertId: this.data.idEvent!,
      ticketsQuantity: this.saleForm.value.ticketsQuantity!,
    };

    this.salesService.buyTicket(sale).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error buying ticket:', error);
        this.dialogRef.close();
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
