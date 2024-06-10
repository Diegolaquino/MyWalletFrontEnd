import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense, Balance } from '../models/expense.model';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = `${environment.apiUrl}/expenses`;

  constructor(private http: HttpClient) { }

  getExpensesByInterval(startDate: string, endDate: string): Observable<Expense[]> {
    const today = new Date();

    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const startIso = start.toISOString().split('T')[0];
    const endIso = end.toISOString().split('T')[0];

    const params = new HttpParams()
      .set('start', startDate === "" ? startIso : startDate)
      .set('end', endDate === "" ? endIso : endDate);

    return this.http.get<{ value: Expense[], messages: string }>(`${this.baseUrl}/bydateinterval`, { params })
      .pipe(
        map((response: { value: Expense[], messages: string }) => response.value)
      );
  }

  getBalance(month: number, year: number): Observable<Balance>{

    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const startIso = start.toISOString().split('T')[0];
    const endIso = end.toISOString().split('T')[0];

    const params = new HttpParams()
      .set('month', month)
      .set('year', year);

    return this.http.get<{ value: Balance, messages: string }>(`${this.baseUrl}/balance`, { params })
      .pipe(
        map((response: { value: Balance, messages: string }) => response.value)
      );
  }
}
