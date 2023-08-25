import { baseUrl } from './urls';
import { axiosApiCall } from './helpers/axios-api';
import { HttpMethod } from '../values/enums/service';


const transactionApiUrl = `${baseUrl}/transaction/`;


const TransactionService = {
    incomeUrl: transactionApiUrl.concat('income'),
    expenseUrl: transactionApiUrl.concat('expense'),
    incomeGroupUrl: transactionApiUrl.concat('income-group'),
    expenseGroupUrl: transactionApiUrl.concat('expense-group'),


    //INCOMES
    getIncomes() {
        return axiosApiCall<any>(HttpMethod.GET, this.incomeUrl);
    },

    addIncome({ body }: { body: any }) {
        return axiosApiCall<any>(HttpMethod.POST, this.incomeUrl, body);
    },
    editIncome({ body, id }: { body: any, id: string }) {
        return axiosApiCall<any>(HttpMethod.PUT, `${this.incomeUrl}/${id}`, body);
    },

    deleteIncome({ id }: { id: string }) {
        return axiosApiCall<any>(HttpMethod.DELETE, `${this.incomeUrl}/${id}`);
    },

    //EXPENSES
    getExpenses() {
        return axiosApiCall<any>(HttpMethod.GET, this.expenseUrl);
    },

    addExpense({ body }: { body: any }) {
        return axiosApiCall<any>(HttpMethod.POST, this.expenseUrl, body);
    },
    editExpense({ body, id }: { body: any, id: string }) {
        return axiosApiCall<any>(HttpMethod.PUT, `${this.expenseUrl}/${id}`, body);
    },

    deleteExpense({ id }: { id: string }) {
        return axiosApiCall<any>(HttpMethod.DELETE, `${this.incomeUrl}/${id}`);
    },

    //INCOME GROUPS
    getIncomeGroups() {
        return axiosApiCall<any>(HttpMethod.GET, this.incomeGroupUrl);
    },

    addIncomeGroup({ body }: { body: any }) {
        return axiosApiCall<any>(HttpMethod.POST, this.incomeGroupUrl, body);
    },
    editIncomeGroup({ body, id }: { body: any, id: string }) {
        return axiosApiCall<any>(HttpMethod.PUT, `${this.incomeGroupUrl}/${id}`, body);
    },

    deleteIncomeGroup({ id }: { id: string }) {
        return axiosApiCall<any>(HttpMethod.DELETE, `${this.incomeGroupUrl}/${id}`);
    },
    //EXPENSE GROUP
    getExpenseGroups() {
        return axiosApiCall<any>(HttpMethod.GET, this.expenseGroupUrl);
    },

    addExpenseGroup({ body }: { body: any }) {
        return axiosApiCall<any>(HttpMethod.POST, this.expenseGroupUrl, body);
    },
    editExpenseGroup({ body, id }: { body: any, id: string }) {
        return axiosApiCall<any>(HttpMethod.PUT, `${this.expenseGroupUrl}/${id}`, body);
    },

    deleteExpenseGroup({ id }: { id: string }) {
        return axiosApiCall<any>(HttpMethod.DELETE, `${this.expenseGroupUrl}/${id}`);
    },






};

export default TransactionService;
