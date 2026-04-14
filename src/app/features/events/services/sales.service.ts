import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SaleResponse } from '../interfaces/Sale';
import { SaleRequest } from '../interfaces/SaleRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  buyTicket(sale: SaleRequest) {
    return this.http.post(`${this.baseUrl}/sales`, sale);
  }

  getSalesByDate(): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`${this.baseUrl}/sales/by-date`);
  }
}
