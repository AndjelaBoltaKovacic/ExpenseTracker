import TransactionService from '../services/transaction.service';
import { TransactionType } from '../values/enums/transactions';

export const getLocationValue = (pathname: string) => {
  switch (pathname) {
    case '/dashboard':
      return 0;
    case '/transactions':
      return 1;
    case '/blog':
      return 2;
    case '/login':
      return 0;
    case '/register':
      return 1;
    default:
      return 0;
  }
};
