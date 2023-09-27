import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display/amount-display';
import Box from '@mui/material/Box';
import Loader from '../../../common/loader';
import useFetch from '../../../hooks/useFetch';
import TransactionService from '../../../services/transaction.service';
import Reminder from '../../../reminder/reminder';
import { TransactionType } from '../../../values/enums/transactions';
import { TableDisplay } from '../../../common/table/table-display';
import { Transaction, TransactionsDTO } from '../../../models/transactions';
import { useUserContext } from '../../../contexts/user.context';
import ActionButtons from './action-buttons';
import useReminderContext from '../../../contexts/reminder.context';
import GetStartedCard from '../../../common/cards/get-started-card';
import { useModalContext } from '../../../contexts/modals.context';
import ErrorCard from '../../../common/cards/error-card';

function Dashboard() {
  const { isPremium, user } = useUserContext();
  const [incomes, setIncomes] = useState<Transaction[]>([] as Transaction[]);
  const [expenses, setExpenses] = useState<Transaction[]>([] as Transaction[]);
  const { reminder } = useReminderContext();
  const { openAddTransactionModal, openManageGroupModal, addTransactionModalOpen } = useModalContext();
  const path = '?page=0&size=5&sort=createdDtm';
  const {
    data: incm,
    error: incmError,
    loading: incmLoading,
    fetchData: fetchIncomes,
  } = useFetch<TransactionsDTO<Transaction[]>>(TransactionService.getIncomes, path);

  const {
    data: exp,
    error: expError,
    loading: expLoading,
    fetchData: fetchExpenses,
  } = useFetch<TransactionsDTO<Transaction[]>>(TransactionService.getExpenses, path);

  useEffect(() => {
    if (user && !addTransactionModalOpen) {
      fetchIncomes();
      fetchExpenses();
    }
  }, [user, addTransactionModalOpen]);

  useEffect(() => {
    exp && setExpenses(exp.data.content);
    incm && setIncomes(incm.data.content);
  }, [exp, incm]);

  useEffect(() => {}, [reminder]);

  return (
    <>
      <Loader isLoading={incmLoading || expLoading}>
        {!!incmError || (!!expError && !incomes.length && !expenses.length) ? (
          <ErrorCard
            onClick={() => {
              fetchIncomes();
              fetchExpenses();
            }}
          />
        ) : (
          <>
            {' '}
            {expenses?.length || incomes?.length ? (
              <Container sx={{ paddingBottom: '60px' }}>
                <AmountDisplay />
                <Box sx={{ width: { sm: '100%', md: '50%', lg: '40%' } }}>
                  <ActionButtons onAdd={openAddTransactionModal} onManage={openManageGroupModal} />
                </Box>
                <Box my={2}>
                  <TableDisplay data={incomes} error={incmError} type={TransactionType.Income} />
                </Box>
                <Box my={2}>
                  <TableDisplay data={expenses} error={expError} type={TransactionType.Expense} />
                </Box>
              </Container>
            ) : (
              <GetStartedCard
                handleAddTransactions={openAddTransactionModal}
                handleManageCategories={openManageGroupModal}
              />
            )}
          </>
        )}
      </Loader>
      {isPremium && <Reminder />}
    </>
  );
}

export default Dashboard;
