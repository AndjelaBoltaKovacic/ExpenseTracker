
import { Transaction } from '../../models/transactions';

export const expenses: Transaction[] = [
  {
    id: 1,
    groupName: 'Shopping', // Replace with the desired category name
    groupId: '1',
    amount: 100,
    name: 'Description A',
    createdDtm: '2023-08-20',

    updatedDtm: '2023-08-20',
  },
  {
    id: 2,
    groupName: 'Transport & Car', // Replace with the desired category name
    groupId: '2',
    amount: 200,
    name: 'Description B',
    createdDtm: '2023-08-21',
    updatedDtm: '2023-08-21',

  },
  {
    id: 3,
    groupName: 'Leisure & Entertainment', // Replace with the desired category name
    groupId: '3',
    amount: 150,
    name: 'Description C',
    createdDtm: '2023-08-22',
    updatedDtm: '2023-08-22',

  },
  {
    id: 4,
    groupName: 'Food & Groceries', // Replace with the desired category name
    groupId: '3',
    amount: 300,
    name: 'Description D',
    createdDtm: '2023-08-23',
    updatedDtm: '2023-08-23',

  },
  {
    id: 5,
    groupName: 'Bars & Restaurants', // Replace with the desired category name
    groupId: '4',
    amount: 50,
    name: 'Description E',
    createdDtm: '2023-08-24',
    updatedDtm: '2023-08-24',
  },
];
