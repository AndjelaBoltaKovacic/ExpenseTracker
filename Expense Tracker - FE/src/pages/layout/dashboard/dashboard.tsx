import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import Box from '@mui/material/Box';
import CustomModal from '../../../common/modal/custom-modal';
import Loader from '../../../common/loader';
import useFetch from '../../../hooks/useFetch';
import TransactionService from '../../../services/transaction.service';
import Reminder from '../../../reminder/reminder';
import { TransactionType } from '../../../values/enums/transactions';
import { TableDisplay } from '../../../common/table/table-display';
import NoticeCard from '../../../common/notice-card';
import AddTransaction from '../../../form/add-transaction/add-transaction';
import { Transaction } from '../../../models/transactions';
import ManageCategories from '../../../form/manage-categories/manage-categories';
import { useUserContext } from '../../../contexts/userContext';
import ActionButtons from './action-buttons';

function Dashboard() {
  const { isPremium, user } = useUserContext();
  const [incomes, setIncomes] = useState<Transaction[]>([] as Transaction[]);
  const [expenses, setExpenses] = useState<Transaction[]>([] as Transaction[]);
  const [openTransModal, setOpenTransModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const path = '?page=0&size=5&sort=createdDtm';
  const {
    data: incm,
    error: incmError,
    loading: incmLoading,
    fetchData: fetchIncomes,
  } = useFetch<Transaction[]>(TransactionService.getIncomes, path);

  const {
    data: exp,
    error: expError,
    loading: expLoading,
    fetchData: fetchExpenses,
  } = useFetch<Transaction[]>(TransactionService.getExpenses, path);

  useEffect(() => {
    if (user) {
      fetchIncomes();
      fetchExpenses();
    }
  }, [user]);

  useEffect(() => {
    exp && setExpenses(exp);
  }, [exp]);

  useEffect(() => {
    incm && setIncomes(incm);
  }, [incm]);

  const handleOpenTransModal = () => {
    setOpenTransModal(true);
  };

  const handleCloseTransModal = (type?: TransactionType) => {
    type === TransactionType.Expense ? fetchExpenses() : fetchIncomes();
    setOpenTransModal(false);
  };

  const handleOpenGroupModal = () => {
    setOpenGroupModal(true);
  };

  const handleCloseGroupModal = () => {
    setOpenGroupModal(false);
  };

  return (
    <>
      <Loader isLoading={incmLoading || expLoading}>
        {expenses?.length || incomes?.length ? (
          <Container>
            <AmountDisplay />
            <ActionButtons onAdd={handleOpenTransModal} onManage={handleOpenGroupModal} />
            {!!incomes.length && (
              <Box my={2}>
                <TableDisplay data={incomes} error={incmError} type={TransactionType.Income} />
              </Box>
            )}
            {!!expenses.length && (
              <Box my={2}>
                <TableDisplay data={expenses} error={expError} type={TransactionType.Expense} />
              </Box>
            )}
            {isPremium && <Reminder />}
          </Container>
        ) : (
          <NoticeCard
            title={`Welcome, ${user?.firstname}!`}
            text="It seems like you don't have any transactions yet."
            buttonText="Get started"
            onButtonClick={handleOpenTransModal}
          />
        )}
      </Loader>
      <CustomModal isOpen={openTransModal} title="Add Transaction" handleClose={handleCloseTransModal}>
        <AddTransaction handleClose={handleCloseTransModal} />
      </CustomModal>
      <CustomModal isOpen={openGroupModal} title="Manage Categories" handleClose={handleCloseGroupModal}>
        <ManageCategories handleClose={handleCloseGroupModal} />
      </CustomModal>
    </>
  );
}

export default Dashboard;
