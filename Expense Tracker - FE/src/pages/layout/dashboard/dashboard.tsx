import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useUserContext } from '../../../contexts/userContext';
import CustomModal from '../../../common/modal/custom-modal';
import AddTransactionForm from '../../../common/form/add-transaction/add-transaction-form';
import Loader from '../../../common/loader';
import useFetch from '../../../hooks/useFetch';
import TransactionService from '../../../services/transaction.service';
import Reminder from '../../../common/reminder';
import { TransactionType } from '../../../values/enums/transactions';
import { _void } from '../../../models/common';
import { TableDisplay } from '../../../common/table/table-display';
import NoticeCard from '../../../common/notice-card';
import ReminderService from '../../../services/reminder.service';
import AddTransaction from '../../../common/form/add-transaction/add-transaction';

function Dashboard({ user }: { user: string }) {
  const { isPremium } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const {
    data: incomes,
    error: incomesError,
    loading: incomesLoading,
    fetchData: fetchIncomes,
  } = useFetch<any>(TransactionService.getIncomes, '?page=0&size=5&sort=createdDtm');

  const {
    data: expenses,
    error: expensesError,
    loading: expensesLoading,
    fetchData: fetchExpenses,
  } = useFetch<any>(TransactionService.getExpenses, '?page=0&size=5&sort=createdDtm');

  const {
    data: reminder,
    error: reminderError,
    loading: reminderLoading,
    fetchData: fetchReminder,
  } = useFetch<any>(ReminderService.getReminder);

  const hasData = incomes?.length && expenses?.length && !incomesError && !expensesError;

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
    fetchReminder();
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // reminder && console.log(reminder);
  }, [reminder]);

  return (
    <>
      <Loader isLoading={incomesLoading || expensesLoading}>
        {hasData ? (
          <Container>
            <AmountDisplay />
            <Box mt={2} display="flex" justifyContent={{ xs: 'center', md: 'end' }}>
              <Button variant="contained" color="secondary" onClick={handleOpen}>
                Add Transaction
              </Button>
            </Box>

            <Box my={2}>
              <TableDisplay data={incomes} error={incomesError} type={TransactionType.Income} />
            </Box>
            <Box my={2}>
              <TableDisplay data={expenses} error={expensesError} type={TransactionType.Expense} />
            </Box>
            {isPremium && <Reminder />}
          </Container>
        ) : (
          <NoticeCard
            title={`Welcome, ${user}!`}
            text="It seems like you don't have any transactions yet."
            buttonText="Get started"
            onButtonClick={handleOpen}
          />
        )}
      </Loader>
      <CustomModal isOpen={openModal} title="Add Transaction" handleClose={handleClose}>
        <AddTransaction handleClose={handleClose} />
      </CustomModal>
    </>
  );
}

export default Dashboard;
