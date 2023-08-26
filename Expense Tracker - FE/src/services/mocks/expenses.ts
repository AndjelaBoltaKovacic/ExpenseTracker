import { Expense } from '../../models/expenses';
import { transactionGroups } from '../../values/constants/menu';

const getRandomCategory = () => {
  const randomIndex = Math.floor(Math.random() * transactionGroups.length);
  return transactionGroups[randomIndex];
};

export const expenses: Expense[] = [
  {
    id: 1,
    category: getRandomCategory(),
    amount: 100,
    description: 'Description A',
    creationTime: '2023-08-20',
    type: 'Income',
  },
  {
    id: 2,
    category: getRandomCategory(),
    amount: 200,
    description: 'Description B',
    creationTime: '2023-08-21',
    type: 'Income',
  },
  {
    id: 3,
    category: getRandomCategory(),
    amount: 150,
    description: 'Description C',
    creationTime: '2023-08-22',
    type: 'Income',
  },
  {
    id: 4,
    category: getRandomCategory(),
    amount: 300,
    description: 'Description D',
    creationTime: '2023-08-23',
    type: 'Income',
  },
  {
    id: 5,
    category: getRandomCategory(),
    amount: 50,
    description: 'Description E',
    creationTime: '2023-08-24',
    type: 'Income',
  },
];
