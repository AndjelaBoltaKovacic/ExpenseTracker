import { Expense } from '../../models/expenses';
import { TRANSACTION_GROUPS } from '../../values/constants/menu';

export const expenses: Expense[] = [
  {
    id: 1,
    category: 'Shopping', // Replace with the desired category name
    amount: 100,
    description: 'Description A',
    creationTime: '2023-08-20',
    type: 'Income',
  },
  {
    id: 2,
    category: 'Transport & Car', // Replace with the desired category name
    amount: 200,
    description: 'Description B',
    creationTime: '2023-08-21',
    type: 'Income',
  },
  {
    id: 3,
    category: 'Leisure & Entertainment', // Replace with the desired category name
    amount: 150,
    description: 'Description C',
    creationTime: '2023-08-22',
    type: 'Income',
  },
  {
    id: 4,
    category: 'Food & Groceries', // Replace with the desired category name
    amount: 300,
    description: 'Description D',
    creationTime: '2023-08-23',
    type: 'Income',
  },
  {
    id: 5,
    category: 'Bars & Restaurants', // Replace with the desired category name
    amount: 50,
    description: 'Description E',
    creationTime: '2023-08-24',
    type: 'Income',
  },
];
