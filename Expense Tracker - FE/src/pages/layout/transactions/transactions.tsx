import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import DataTable from '../../../common/table/table';
import { Transaction, TransactionsDTO } from '../../../models/transactions';
import { TransactionType } from '../../../values/enums/transactions';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../../common/loader';
import { FilterBox } from '../../../form/filter-box';
import ReportGenerator from '../../../reports/report-generator';
import ErrorCard from '../../../common/cards/error-card';
import { useLocation } from 'react-router-dom';
import GetStartedCard from '../../../common/cards/get-started-card';

const defaultParams = { sort: 'updatedDtm', order: 'desc', priceRange: { from: 0, to: 10000 }, dateRange: [null, null], minMax: [0, 1000] }

export const getType = (pathname: string) => {
    return pathname.includes('incomes') ? TransactionType.Income : TransactionType.Expense;
}

const getService = (pathname: string) => {
    return getType(pathname) === TransactionType.Income ? TransactionService.getIncomes : TransactionService.getExpenses;
}

export const Transactions = () => {
    const location = useLocation();
    const type = getType(location.pathname)
    const [openTransModal, setOpenTransModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [params, setParams] = useState(defaultParams);
    const [transationToModify, setTransactionToModify] = useState<Transaction | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([] as Transaction[]);
    const { data, loading, error, fetchData } = useFetch<TransactionsDTO<Transaction[]>>(
        getService(location.pathname),
        `?amountFrom=${params.priceRange.from}&amountTo=${params.priceRange.to}&dateFrom=${params.dateRange[0] || ''
        }&dateTo=${params.dateRange[1] || ''}&page=0&size=10&sort=${params.sort},${params.order}`
    );

    const handleEditOpen = (transaction: Transaction) => {
    setTransactionToModify(transaction);
    setOpenEditModal(true);
    };

    const handleOpenTransModal = () => {
        setOpenTransModal(true);
    };

    const handleDeleteOpen = (transaction: Transaction) => {
    setTransactionToModify(transaction);
    setOpenDeleteModal(true);
    };

    useEffect(() => {
    fetchData();
    }, [location.pathname]);

    useEffect(() => {
    if (data) {
        setTransactions(data.data.content);
        setParams({ ...params, minMax: [Math.floor(data.minAmount), Math.ceil(data.maxAmount)] });
    }
    }, [data])


    const handleResetFilters = () => {
        setParams(defaultParams)
    };

    return (
    <Container sx={{ marginTop: '5vw' }}>
            <Loader isLoading={loading}>
                {transactions.length ? <>
                    <Box mt='3vw' mb='1vw' display='flex' justifyContent='space-between'>
                        <Button onClick={handleResetFilters}>Reset Filters</Button>
                    </Box>
                    <Box flexGrow={1} mb='3vw'>
                        <FilterBox
                            handleSubmit={fetchData}
                            params={params}
                            setParams={setParams}
                        />
                    </Box>
                    <DataTable
                        params={params}
                        setParams={setParams}
                        type={type}
                        data={transactions}
                    />
                    <ReportGenerator type={type} />
                </> : <GetStartedCard onClick={handleOpenTransModal} />
                }
                {error && (
                    <ErrorCard
                        onClick={fetchData}
                    />
                )}
            </Loader>
    </Container>
    );
}

export default Transactions;
