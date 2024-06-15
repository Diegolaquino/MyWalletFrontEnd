import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PieGraphComponent } from './pie-graph/pie-graph.component';
import { HistoryGraphComponent } from './history-graph/history-graph.component';
import { CardBalanceComponent } from './card-balance/card-balance.component';
import { ListTableComponent } from './list-table/list-table.component';
import { WalletTabComponent } from './wallet-tab/wallet-tab.component';
import { NextMonthComponent } from './next-month/next-month.component';
import { ExpenseFormComponent } from './forms/expense-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, CommonModule, PieGraphComponent,
    HistoryGraphComponent,
    WalletTabComponent,
    CardBalanceComponent,
    ListTableComponent,
    NextMonthComponent,
    ExpenseFormComponent,
    NavBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mywallet-frontend';
}
