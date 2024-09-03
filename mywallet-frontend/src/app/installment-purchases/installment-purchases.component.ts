import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-installment-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './installment-purchases.component.html',
  styleUrl: './installment-purchases.component.css'
})

export class InstallmentPurchasesComponent {

}
