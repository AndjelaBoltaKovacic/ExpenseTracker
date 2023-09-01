import { TransactionGroup } from '../models/transactions';
import TransactionService from '../services/transaction.service';
import { DAYS_OF_WEEK } from '../values/constants/menu';
import { ReminderType } from '../values/enums/reminder';
import { Action } from '../values/enums/service';
const locationValueMap: { [pathname: string]: number } = {
  '/dashboard': 0,
  '/transactions': 1,
  '/blog': 2,
  '/login': 0,
  '/register': 1,
};

export const getLocationValue = (pathname: string): number => {
  return locationValueMap[pathname];
};

const getReminderWeekDay = (day: number) => {
  return DAYS_OF_WEEK.find((el) => el.value === day)?.label;
};

const getReminderMonthDay = (day: number) => {
  return (day > 15 ? 'last' : day <= 1 ? 'first' : '15th') + 'day of month';
};
export const getReminderText = (reminderType: ReminderType, reminderDay: number) => {
  return reminderType === ReminderType.Weekly ? getReminderWeekDay(reminderDay) : getReminderMonthDay(reminderDay);
};

export const getApiCall = (isExpense: boolean, action: Action) => {
  return {
    [Action.Add]: isExpense ? TransactionService.addExpenseGroup : TransactionService.addIncomeGroup,
    [Action.Edit]: isExpense ? TransactionService.editExpenseGroup : TransactionService.editIncomeGroup,
    [Action.Delete]: isExpense ? TransactionService.deleteExpenseGroup : TransactionService.deleteIncomeGroup,
  }[action];
};

export const getReqBody = (group: TransactionGroup, action: Action) => {
  return {
    [Action.Add]: { ...group, type: 'USER_DEFINED' },
    [Action.Edit]: { name: group.name, type: 'USER_DEFINED' },
    [Action.Delete]: undefined,
  }[action];
};
