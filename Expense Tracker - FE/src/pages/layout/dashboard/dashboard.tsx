import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useUserContext } from '../../../contexts/userContext';
import CustomModal from '../../../common/modal/custom-modal';
import Loader from '../../../common/loader';
import useFetch from '../../../hooks/useFetch';
import TransactionService from '../../../services/transaction.service';
import Reminder from '../../../common/reminder';
import { TransactionType } from '../../../values/enums/transactions';
import { TableDisplay } from '../../../common/table/table-display';
import NoticeCard from '../../../common/notice-card';
import AddTransaction from '../../../common/form/add-transaction/add-transaction';
import { Transaction } from '../../../models/transactions';
import { DatePicker } from '@mui/lab';

function Dashboard({ user }: { user: string }) {
  const { isPremium } = useUserContext();
  const [incomes, setIncomes] = useState<Transaction[]>([] as Transaction[]);
  const [expenses, setExpenses] = useState<Transaction[]>([] as Transaction[]);
  const [openModal, setOpenModal] = useState(false);
  const {
    data: incm,
    error: incmError,
    loading: incmLoading,
    fetchData: fetchIncomes,
  } = useFetch<Transaction[]>(TransactionService.getIncomes, '?page=0&size=5&sort=createdDtm');

  const {
    data: exp,
    error: expError,
    loading: expLoading,
    fetchData: fetchExpenses,
  } = useFetch<Transaction[]>(TransactionService.getExpenses, '?page=0&size=5&sort=createdDtm');

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  useEffect(() => {
    exp && setExpenses(exp);
  }, [exp]);

  useEffect(() => {
    incm && setIncomes(incm);
  }, [incm]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Loader isLoading={incmLoading || expLoading}>
        {expenses?.length || incomes?.length ? (
          <Container>
            <AmountDisplay />
            <Box mt={2} display='flex' justifyContent={{ xs: 'center', md: 'end' }}>
              <Button variant='contained' color='secondary' onClick={handleOpen}>
                Add Transaction
              </Button>
            </Box>
            <Box my={2}>
              <TableDisplay data={incomes} error={incmError} type={TransactionType.Income} />
            </Box>
            <Box my={2}>
              <TableDisplay data={expenses} error={expError} type={TransactionType.Expense} />
            </Box>
            {isPremium && <Reminder />}
          </Container>
        ) : (
          <NoticeCard
            title={`Welcome, ${user}!`}
            text="It seems like you don't have any transactions yet."
            buttonText='Get started'
            onButtonClick={handleOpen}
          />
        )}
      </Loader>
      <CustomModal isOpen={openModal} title='Add Transaction' handleClose={handleClose}>
        <AddTransaction handleClose={handleClose} />
      </CustomModal>
    </>
  );
}

export default Dashboard;
