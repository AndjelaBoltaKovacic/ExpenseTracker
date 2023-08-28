import { useEffect, useState } from 'react';
import CustomModal from '../../../common/modal/custom-modal';
import DataTable from '../../../common/table/table';
import { Expense, Transaction } from '../../../models/transactions';
import EditTransaction from '../../../common/form/edit/edit-transaction';
import DeleteTransaction from '../../../common/form/steps/delete';
import { TransactionType } from '../../../values/enums/transactions';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../../common/loader';
import NoticeCard from '../../../common/notice-card';
import { Box, Container, TextField } from '@mui/material';
import TransactionToggler from '../../../common/toggler/transaction-toggler';

import { FilterBox } from '../../../common/form/filter-box';
import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';

function Transactions() {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [sort, setSort] = useState<string>('updatedDtm');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(0);
  const [amountFrom, setAmountFrom] = useState<number>(0);
  const [amountTo, setAmountTo] = useState<number>(10000);
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [transationToModify, setTransactionToModify] = useState<Expense | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([] as Transaction[]);
  const { data, loading, error, fetchData } = useFetch<Transaction[]>(
    isExpense ? TransactionService.getExpenses : TransactionService.getIncomes,
    `?amountFrom=${amountFrom}&amountTo=${amountTo}&dateFrom=${
      dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : ''
    }&dateTo=${dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''}&page=${0}&size=10&sort=${sort}`
  );

  const handleEditOpen = (transaction: Expense) => {
    setTransactionToModify(transaction);
    setOpenEditModal(true);
  };

  const handleDeleteOpen = (transaction: Expense) => {
    setTransactionToModify(transaction);
    setOpenDeleteModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    fetchData();
  }, [isExpense, fetchTrigger]);

  useEffect(() => {
    data && setTransactions(data);
  }, [data]);

  const handleAmountChange = (event: any, newValue: any) => {
    setAmountFrom(newValue[0]);
    setAmountTo(newValue[1]);
  };

  return (
    <Container sx={{ marginTop: '5vw' }}>
      <Loader isLoading={loading}>
        {!error ? (
          <>
            <Box marginBottom='3vw' display='flex' gap={3} alignItems='center'>
              <TransactionToggler value={isExpense} onChange={() => setIsExpense((prev) => !prev)} />
            </Box>
            <Box flexGrow={1} mb='3vw'>
              <FilterBox
                amountTo={amountTo}
                amountFrom={amountFrom}
                dateRange={dateRange}
                setDateRange={setDateRange}
                handleAmountChange={handleAmountChange}
                handleSubmit={() => setFetchTrigger((prevVal) => !prevVal)}
              />
            </Box>
            <DataTable
              type={TransactionType.Expense}
              data={transactions}
              onEditClick={handleEditOpen}
              onDeleteClick={handleDeleteOpen}
            />
            <CustomModal isOpen={openEditModal} handleClose={handleEditClose}>
              <EditTransaction handleClose={handleEditClose} transactionToEdit={transationToModify as Expense} />
            </CustomModal>
            <CustomModal isOpen={openDeleteModal} handleClose={handleDeleteClose}>
              <DeleteTransaction handleClose={handleDeleteClose} transactionToDelete={transationToModify as Expense} />
            </CustomModal>
          </>
        ) : (
          <NoticeCard
            title='Opps! Something went wrong!'
            text='Sorry for the inconvenience. Please try again later.'
            buttonText='Retry'
            onButtonClick={() => fetchData()}
          />
        )}
      </Loader>
    </Container>
  );
}

export default Transactions;
