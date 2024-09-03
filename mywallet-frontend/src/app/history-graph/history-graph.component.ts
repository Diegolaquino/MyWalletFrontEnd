import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { ExpenseService } from '../services/expense.service';
import { CommonModule } from '@angular/common';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-history-graph',
  templateUrl: './history-graph.component.html',
  styleUrls: ['./history-graph.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class HistoryGraphComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 9, today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());

    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    this.expenseService.getExpensesByInterval(startDate, endDate).subscribe(expenses => {
      this.expenses = expenses;
      this.renderLineChart();
    });
  }

  renderLineChart(): void {
    const ctx = document.getElementById('chart-history') as HTMLCanvasElement;

    const formatMonth = (dateStr: string): string => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    interface GroupedExpenses {
      [key: string]: { expense: number, income: number, others: number };
    }

    const groupedExpenses: GroupedExpenses = this.expenses.reduce((acc: GroupedExpenses, expense) => {
      if (expense.expenseDate) {
        const month = formatMonth(expense.expenseDate);
        if (!acc[month]) {
          acc[month] = { expense: 0, income: 0, others: 0 };
        }
        if (expense.type === 1) {
          acc[month].expense += expense.value;
        } else if (expense.type === 2) {
          acc[month].income += expense.value;
        } else if (expense.type === 3) {
          acc[month].others += expense.value;
        }
      }
      return acc;
    }, {});

    const labels = Object.keys(groupedExpenses).sort();
    const expenseData = labels.map(month => groupedExpenses[month].expense);
    const incomeData = labels.map(month => groupedExpenses[month].income);
    const othersData = labels.map(month => groupedExpenses[month].others);

    // Chart.register(annotationPlugin);
    // const currentMonth = new Date().getMonth();

    const historyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Expenses',
            data: expenseData,
            borderColor: 'rgba(255, 99, 132, 0.6)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false
          },
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'rgba(54, 162, 235, 0.6)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false
          },
          {
            label: 'Others',
            data: othersData,
            borderColor: 'rgba(255, 206, 86, 0.6)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
              tooltipFormat: 'MM/yyyy',
              displayFormats: {
                month: 'MM/yyyy'
              }
            },
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}
