import { useState } from 'react';
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

function Dashboard() {
  const { isPremium } = useUserContext();
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Container>
      <CustomModal isOpen={openModal} title="Add Transaction" handleClose={handleClose}>
        <AddTransactionForm handleClose={handleClose} />
      </CustomModal>
      <AmountDisplay />
      <Box mt={2} display="flex" justifyContent="end">
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Add Transaction
        </Button>
      </Box>

      <Box my={2}>
        <Typography p={2} color="primary.main">
          Last 5 income transactions
        </Typography>
        <DataTable hideButtons data={expenses} disableSort />
      </Box>
      <Box my={2}>
        <Typography p={2} color="primary.main">
          Last 5 expense transactions
        </Typography>
        <DataTable hideButtons data={expenses} disableSort />
      </Box>
      {isPremium && <NoticeCard title="Weekly reminder" text="some text" />}
    </Container>
  );
}

export default Dashboard;
