export interface Expense {
  id: number;
  group: string;
  type: 'Income' | 'Expense'
  amount: number;
  description: string;
  creationTime: string;
}
