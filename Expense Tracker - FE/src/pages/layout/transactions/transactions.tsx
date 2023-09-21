import { useEffect, useState } from 'react';
import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';
import CustomModal from '../../../common/modal/custom-modal';
import DataTable from '../../../common/table/table';
import { Expense, Transaction, TransactionsDTO } from '../../../models/transactions';
import EditTransaction from '../../../form/manage-transactions/edit-transaction/edit-transaction';
import DeleteTransaction from '../../../form/steps/delete';
import { TransactionType } from '../../../values/enums/transactions';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../../common/loader';
import { Box, Button, Container } from '@mui/material';
import TransactionToggler from '../../../common/toggler/transaction-toggler';
import { FilterBox } from '../../../form/filter-box';
import ReportGenerator from '../../../reports/report-generator';
import ErrorCard from '../../../common/error-card';
import TransactionsModals from './transactions-modals';

function Transactions() {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [minMax, setMinMax] = useState<number[]>([0, 1000]);
  const [reset, setReset] = useState<boolean>(false);
  const [sort, setSort] = useState<string>('updatedDtm');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [priceRange, setPriceRange] = useState({ from: 0, to: 10000 });
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [transationToModify, setTransactionToModify] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([] as Transaction[]);
  const { data, loading, error, fetchData } = useFetch<TransactionsDTO<Transaction[]>>(
    isExpense ? TransactionService.getExpenses : TransactionService.getIncomes,
    `?amountFrom=${priceRange.from}&amountTo=${priceRange.to}&dateFrom=${
      dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : ''
    }&dateTo=${dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''}&page=0&size=10&sort=${sort},${order}`
  );

  const handleEditOpen = (transaction: Transaction) => {
    setTransactionToModify(transaction);
    setOpenEditModal(true);
  };

  const handleDeleteOpen = (transaction: Transaction) => {
    setTransactionToModify(transaction);
    setOpenDeleteModal(true);
  };


  useEffect(() => {
    fetchData();
  }, [isExpense, reset, sort]);

  useEffect(() => {
    if (data) {
      setTransactions(data.data.content);
      setMinMax([Math.floor(data.minAmount), Math.ceil(data.maxAmount)]);
    }
  }, [data]);

  const handleAmountChange = (event: any, newValue: any) => {
    setPriceRange({ from: newValue[0], to: newValue[1] });
  };

  const handleResetFilters = () => {
    setPriceRange({ from: 0, to: 1000 });
    setDateRange([null, null]);
    setReset((prevVal) => !prevVal);
  };

  return (
    <Container sx={{ marginTop: '5vw' }}>
      <Loader isLoading={loading}>
        <>
          <Box mt='3vw' mb='1vw' display='flex' justifyContent='space-between'>
            <TransactionToggler value={isExpense} onChange={() => setIsExpense((prev) => !prev)} />
            <Button onClick={handleResetFilters}>Reset Filters</Button>
          </Box>
          <Box flexGrow={1} mb='3vw'>
            <FilterBox
              minMax={minMax}
              priceRange={priceRange}
              dateRange={dateRange}
              setDateRange={setDateRange}
              handleAmountChange={handleAmountChange}
              handleSubmit={fetchData}
            />
          </Box>
          <DataTable
            order={order}
            setOrder={setOrder}
            orderBy={sort}
            setOrderBy={setSort}
            type={isExpense ? TransactionType.Expense : TransactionType.Income}
            data={transactions}
            onEditClick={handleEditOpen}
            onDeleteClick={handleDeleteOpen}
          />
          <ReportGenerator isExpense={isExpense} />
        </>
        {error && (
          <ErrorCard
            onClick={fetchData}
          />
        )}
      </Loader>
      <TransactionsModals openEdit={setOpenEditModal} openDelete={setOpenDeleteModal} isEditOpen={openEditModal} isDeleteOpen={openDeleteModal} transactionToModify={transationToModify} fetchData={fetchData} />
    </Container>
  );
}

export default Transactions;
