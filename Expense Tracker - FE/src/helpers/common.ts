import { TransactionGroup } from '../models/transactions';
import TransactionService from '../services/transaction.service';
import { DAYS_OF_WEEK } from '../values/constants/menu';
import { ReminderType } from '../values/enums/reminder';
import { Action } from '../values/enums/service';
import { TransactionType } from '../values/enums/transactions';


const locationValueMap: { [pathname: string]: number } = {
  '/dashboard': 0,
  '/transactions/incomes': 1,
  '/transactions/expenses': 1,
  '/blog': 2,
};

const childRouteValueMap: { [pathname: string]: number } = {
  '/transactions/incomes': 0,
  '/transactions/expenses': 1,
};

export const getLocationValue = (pathname: string, isChildNav: boolean = false): number => {
  return !isChildNav ? locationValueMap[pathname] : childRouteValueMap[pathname]
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

export const getType = (pathname: string) => {
  return pathname.includes('incomes') ? TransactionType.Income : TransactionType.Expense;
};

export const getService = (pathname: string) => {
  return getType(pathname) === TransactionType.Income ? TransactionService.getIncomes : TransactionService.getExpenses;
};