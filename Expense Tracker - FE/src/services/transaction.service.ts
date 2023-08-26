import { baseUrl } from './urls';
import { axiosApiCall } from './axios-api';
import { HttpMethod } from '../values/enums/service';
import { TrasnactionsDTO } from '../models/transactions.dto';

const transactionApiUrl = `${baseUrl}/transaction/`;
const incomeUrl = transactionApiUrl.concat('income');
const expenseUrl = transactionApiUrl.concat('expense');
const incomeGroupUrl = transactionApiUrl.concat('income-group');
const expenseGroupUrl = transactionApiUrl.concat('expense-group');

const TransactionService = {
  //INCOMES
  getIncomes<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.GET, `${incomeUrl + path}`);
  },

  addIncome<T>({ body }: { body: any }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.POST, incomeUrl, body);
  },
  editIncome<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.PUT, `${incomeUrl}/${path}`, body);
  },

  deleteIncome<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //EXPENSES
  getExpenses<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.GET, `${expenseUrl + path}`);
  },

  addExpense<T>({ body }: { body: any }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.POST, expenseUrl, body);
  },
  editExpense<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.PUT, `${expenseUrl}/${path}`, body);
  },

  deleteExpense<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.DELETE, `${incomeUrl}/${path}`);
  },

  //INCOME GROUPS
  getIncomeGroups<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.GET, `${incomeGroupUrl + path}`);
  },

  addIncomeGroup<T>({ body }: { body: any }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.POST, incomeGroupUrl, body);
  },
  editIncomeGroup<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.PUT, `${incomeGroupUrl + path}`, body);
  },

  deleteIncomeGroup<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.DELETE, `${incomeGroupUrl + path}`);
  },
  //EXPENSE GROUP
  getExpenseGroups<T>() {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.GET, expenseGroupUrl);
  },

  addExpenseGroup<T>({ body }: { body: any }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.POST, expenseGroupUrl, body);
  },
  editExpenseGroup<T>({ body, path }: { body: any; path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.PUT, `${expenseGroupUrl}/${path}`, body);
  },

  deleteExpenseGroup<T>({ path }: { path: string }) {
    return axiosApiCall<TrasnactionsDTO<T>>(HttpMethod.DELETE, `${expenseGroupUrl}/${path}`);
  },
};

export default TransactionService;
