import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TransactionService from '../services/transaction.service';
import useFetch from '../hooks/useFetch';
import Loader from './loader';
import Chart from './chart';
import AmountCard from './amount-card';
import Carousel from './carousel';

const AmountDisplay = () => {
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const {
    data: incm,
    error: incmError,
    loading: incmLoading,
    fetchData: fetchIncomes,
  } = useFetch<any>(TransactionService.getIncomeAmount);

  const {
    data: exp,
    error: expError,
    loading: expLoading,
    fetchData: fetchExpenses,
  } = useFetch<any>(TransactionService.getExpenseAmount);

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (incm && exp) {
      setTotalIncome(incm.totalAmount);
      setTotalExpense(exp.totalAmount);
      // setTotalAmount(incm.totalAmount - exp.totalAmount);
    }
  }, [incm, exp]);


  return (
    <Box>
      <Loader isLoading={incmLoading || expLoading}>
        {(incmError || expError) && (
          <Typography variant="body1" mx={5} borderTop={1} borderColor="primary.main">
            An error occured
          </Typography>
        )}
        <Carousel
          content2={<Chart totalIncome={totalIncome || 0} totalExpense={totalExpense || 0} />}
          content1={<AmountCard totalAmount={totalIncome - totalExpense} />}
        />
      </Loader>
    </Box>
  );
};

export default AmountDisplay;
