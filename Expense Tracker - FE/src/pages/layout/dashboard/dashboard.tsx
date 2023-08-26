import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import DataTable from '../../../common/table/table';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import NoticeCard from '../../../common/notice-card';
import { useUserContext } from '../../../contexts/userContext';
import CustomModal from '../../../common/modal/custom-modal';
import AddTransactionForm from '../../../common/form/add-transaction/add-transaction-form';
import { expenses } from '../../../services/mocks/expenses';
import Loader from '../../../common/loader';
import useFetch from '../../../hooks/useFetch';
import TransactionService from '../../../services/transaction.service';

function Dashboard() {
  const { isPremium } = useUserContext();
  const [openModal, setOpenModal] = useState(false);
  const {
    data: incomes,
    error: incomesError,
    loading: incomesLoading,
    fetchData: fetchIncomes,
  } = useFetch(TransactionService.getIncomes, '?page=0&size=5&sort=createdDtm');

  const {
    data: expenses,
    error: expensesError,
    loading: expensesLoading,
    fetchData: fetchExpenses,
  } = useFetch(TransactionService.getIncomes, '?page=0&size=5&sort=createdDtm');

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Loader isLoading={incomesLoading || expensesLoading}>
        <Container>
          <AmountDisplay />
          <Box mt={2} display="flex" justifyContent={{ xs: 'center', md: 'end' }}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Add Transaction
            </Button>
          </Box>

          <Box my={2}>
            <Typography p={2} color="primary.main">
              Last 5 income transactions
            </Typography>
            <DataTable hideButtons data={[]} disableSort />
          </Box>
          <Box my={2}>
            <Typography p={2} color="primary.main">
              Last 5 expense transactions
            </Typography>
            <DataTable hideButtons data={[]} disableSort />
          </Box>
          {isPremium && <NoticeCard title="Weekly reminder" text="some text" />}
        </Container>
      </Loader>
      <CustomModal isOpen={openModal} title="Add Transaction" handleClose={handleClose}>
        <AddTransactionForm handleClose={handleClose} handleConfirm={() => console.log('bla')} />
      </CustomModal>
    </>
  );
}

export default Dashboard;
