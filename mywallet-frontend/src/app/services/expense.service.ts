import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Expense, Balance, EntryExpense } from '../models/expense.model';
import { environment } from '../../enviroment/enviroment';
import { HttpHeaders } from '@angular/common/http';

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

  createExpense(expense: EntryExpense): Observable<Expense>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Acess-Control-Allow-Origin': '*'
    });

    console.log('Sending expense:', JSON.stringify(expense));

    return this.http.post<{ value: Expense, messages: string }>(
      this.baseUrl,
      JSON.stringify({ expense }),
      { headers }
    ).pipe(
      map((response: { value: Expense, messages: string }) => {
        console.log('Received response:', response);
        return response.value;
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(`Server-side error: ${error.status} - ${error.statusText}`);
          console.error('Response body:', error.error);
        }
        return throwError(error);
      })
    );
  }
}
