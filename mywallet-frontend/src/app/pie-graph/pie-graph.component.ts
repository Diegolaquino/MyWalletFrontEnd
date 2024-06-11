import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model'; // Importe o modelo Expense aqui se necessário
import Chart from 'chart.js/auto';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-pie-graph',
  templateUrl: './pie-graph.component.html',
  styleUrls: ['./pie-graph.component.css'],
  standalone: true,
  imports:[ CommonModule, FormsModule ]
})
export class PieGraphComponent implements OnInit {
  expenses: Expense[] = [];
  startDate: string = '';
  endDate: string = '';
  chart: Chart<'pie', number[], string> | undefined;
   colors: string[] = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 0, 0, 0.6)',
    'rgba(0, 255, 0, 0.6)',
    'rgba(0, 0, 255, 0.6)',
    'rgba(128, 128, 0, 0.6)',
    'rgba(128, 0, 128, 0.6)',
    'rgba(0, 128, 128, 0.6)',
    'rgba(255, 255, 0, 0.6)',
    'rgba(255, 0, 255, 0.6)',
    'rgba(0, 255, 255, 0.6)',
    'rgba(128, 128, 128, 0.6)',
    'rgba(192, 192, 192, 0.6)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(255, 165, 0, 0.6)',
    'rgba(210, 105, 30, 0.6)'
  ];
  

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpensesByInterval("", "").subscribe(expenses => {
      this.expenses = expenses;
      console.log(expenses);
      this.renderPieChart();
    });
  }

  updatePieChart(): void {
    this.expenseService.getExpensesByInterval(this.startDate, this.endDate).subscribe(expenses => {
      this.expenses = expenses;
      this.renderPieChart();
    });
  }
  
  renderPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    const categorySums = this.expenses.reduce((acc: { [key: string]: number }, expense: Expense) => {
      if (expense.categoryName) {
        if (!acc[expense.categoryName]) {
          acc[expense.categoryName] = 0;
        }

        if(expense.type == 1)
          acc[expense.categoryName] += expense.value;
      }
      return acc;
    }, {});

    const labels = Object.keys(categorySums);
    const data = Object.values(categorySums);

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.colors.slice(0, labels.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}