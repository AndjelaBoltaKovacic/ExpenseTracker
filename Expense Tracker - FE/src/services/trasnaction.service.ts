import { baseUrl } from './urls';
import { axiosApiCall } from './helpers/axios-api';
import { HttpMethod } from '../values/enums/service';


const transactionApiUrl = `${baseUrl}/transaction/`;


const TransactionService = {
    incomeUrl: transactionApiUrl.concat('income'),
    expenseUrl: transactionApiUrl.concat('expense'),


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
    }



};

export default TransactionService;
