import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../models/expense.model';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WalletService {
    private baseUrl = environment.apiUrl; // Use a URL da API do arquivo de configuração
  
    constructor(private http: HttpClient) { }
  
    getWallets(): Observable<Wallet[]> {
        return this.http.get<{ value: Wallet[], messages: string }>(this.baseUrl + `/wallets`)
          .pipe(
            map((response: { value: Wallet[], messages: string }) => response.value)
          );
    }
  
    getWalletById(id: string): Observable<Wallet> {
      return this.http.get<Wallet>(`${this.baseUrl}/wallets/${id}`);
    }
  
    createWallet(wallet: Wallet): Observable<Wallet> {
      return this.http.post<Wallet>(`${this.baseUrl}/wallets`, wallet);
    }
  
    updateWallet(id: string, wallet: Wallet): Observable<Wallet> {
      return this.http.put<Wallet>(`${this.baseUrl}/wallets/${id}`, wallet);
    }
  
    deleteWallet(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/wallets/${id}`);
    }
  }