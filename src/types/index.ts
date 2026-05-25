export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'shopping'
  | 'entertainment'
  | 'health'
  | 'housing'
  | 'investment'
  | 'other';

export interface ScheduledExpense {
  id: string;
  date: string;           // YYYY-MM-DD
  title: string;
  amount: number;
  category: ExpenseCategory;
  isImpulse: boolean;
  confirmed: boolean;
}

export interface ProjectionPoint {
  year: number;
  conservative: number;
  base: number;
  optimistic: number;
}

export interface FinanceSettings {
  monthlyIncome: number;
  monthlyFixedExpenses: number;
  monthlySavings: number;
  investmentRate: number;   // annual % e.g. 7
  currentNetWorth: number;
  goalNetWorth: number;
  goalYears: number;
  monthlyBudget: number;
}
