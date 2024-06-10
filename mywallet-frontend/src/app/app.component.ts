import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PieGraphComponent } from './pie-graph/pie-graph.component';
import { HistoryGraphComponent } from './history-graph/history-graph.component';
import { CardBalanceComponent } from './card-balance/card-balance.component';
import { ListTableComponent } from './list-table/list-table.component';
import { WalletTabComponent } from './wallet-tab/wallet-tab.component';
import { NextMonthComponent } from './next-month/next-month.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, PieGraphComponent,
    HistoryGraphComponent,
    WalletTabComponent,
    CardBalanceComponent,
    ListTableComponent,
    NextMonthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mywallet-frontend';
}
