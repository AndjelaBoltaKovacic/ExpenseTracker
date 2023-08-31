import { useEffect, useState } from 'react';
import CustomModal from '../../../common/modal/custom-modal';
import DataTable from '../../../common/table/table';
import { Expense, Transaction } from '../../../models/transactions';
import EditTransaction from '../../../form/edit-transaction/edit-transaction';
import DeleteTransaction from '../../../form/steps/delete';
import { TransactionType } from '../../../values/enums/transactions';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../../common/loader';
import NoticeCard from '../../../common/notice-card';
import { Box, Button, Container } from '@mui/material';
import TransactionToggler from '../../../common/toggler/transaction-toggler';
import { FilterBox } from '../../../form/filter-box';
import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';
import ReportGenerator from '../../../reports/report-generator';
import AddTransaction from '../../../form/add-transaction/add-transaction';
import { useUserContext } from '../../../contexts/userContext';

function Transactions() {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openTransModal, setOpenTransModal] = useState(false);
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [sort, setSort] = useState<string>('updatedDtm');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState<number>(0);
  const [amountFrom, setAmountFrom] = useState<number>(0);
  const [amountTo, setAmountTo] = useState<number>(10000);
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [transationToModify, setTransactionToModify] = useState<Expense | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([] as Transaction[]);
  const { user } = useUserContext();
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
    fetchData();
    setOpenEditModal(false);
  };

  const handleDeleteClose = () => {
    fetchData();
    setOpenDeleteModal(false);
  };

  const handleOpenTransModal = () => {
    setOpenTransModal(true);
  };

  const handleCloseTransModal = (type?: TransactionType) => {
    type === TransactionType.Expense ? setIsExpense(true) : setIsExpense(false);
    setOpenTransModal(false);
  };

  useEffect(() => {
    fetchData();
  }, [isExpense]);

  useEffect(() => {
    data && setTransactions(data);
  }, [data]);

  const handleAmountChange = (event: any, newValue: any) => {
    setAmountFrom(newValue[0]);
    setAmountTo(newValue[1]);
  };

  const handleResetFilters = () => {
    setAmountTo(1000);
    setAmountFrom(0);
    setDateRange([null, null]);
    fetchData();
  };

  return (
    <Container sx={{ marginTop: '5vw' }}>
      <Loader isLoading={loading}>
        {data?.length ? (
          <>
            <Box flexGrow={1} mb="3vw">
              <FilterBox
                amountTo={amountTo}
                amountFrom={amountFrom}
                dateRange={dateRange}
                setDateRange={setDateRange}
                handleAmountChange={handleAmountChange}
                handleSubmit={() => fetchData()}
              />
            </Box>

            <Box mt="3vw" mb="1vw" display="flex" justifyContent="space-between">
              <TransactionToggler value={isExpense} onChange={() => setIsExpense((prev) => !prev)} />
              <Button onClick={() => handleResetFilters()}>Reset Filters</Button>
            </Box>

            <DataTable
              type={TransactionType.Expense}
              data={transactions}
              onEditClick={handleEditOpen}
              onDeleteClick={handleDeleteOpen}
            />
            <ReportGenerator isExpense={isExpense} />
          </>
        ) : (
          <NoticeCard
            title={`Hi, ${user?.firstname}!`}
            text={`It seems like you don't have any ${isExpense ? 'expenses' : 'incomes'} yet.`}
            buttonText="Get started"
            onButtonClick={handleOpenTransModal}
          />
        )}
        {error && (
          <NoticeCard
            title="Opps! Something went wrong!"
            text="Sorry for the inconvenience. Please try again later."
            buttonText="Retry"
            onButtonClick={() => fetchData()}
          />
        )}
      </Loader>
      <CustomModal isOpen={openTransModal} title="Add Transaction" handleClose={handleCloseTransModal}>
        <AddTransaction handleClose={handleCloseTransModal} />
      </CustomModal>
      <CustomModal isOpen={openEditModal} handleClose={handleEditClose}>
        <EditTransaction handleClose={handleEditClose} transactionToEdit={transationToModify as Expense} />
      </CustomModal>
      <CustomModal isOpen={openDeleteModal} handleClose={handleDeleteClose}>
        <DeleteTransaction handleClose={handleDeleteClose} transactionToDelete={transationToModify as Expense} />
      </CustomModal>
    </Container>
  );
}

export default Transactions;
