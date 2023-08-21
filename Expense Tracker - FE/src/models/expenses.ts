export interface Expense {
  id: number;
  category: string;
  type: 'Income' | 'Expense';
  amount: number;
  description: string;
  creationTime: string;
}
