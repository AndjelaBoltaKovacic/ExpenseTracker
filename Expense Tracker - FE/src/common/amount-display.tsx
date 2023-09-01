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
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);

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
      setTotalAmount(incm.totalAmount - exp.totalAmount);
    }
  }, [incm, exp]);

  return (
    <Box>
      <Loader isLoading={incmLoading || expLoading}>
        {incmError ||
          (expError && (
            <Typography variant='body1' mx={5} borderTop={1} borderColor='primary.main'>
              An error occured
            </Typography>
          ))}
        <Carousel
          content1={<Chart totalIncome={7890} totalExpense={789} />}
          content2={<AmountCard totalAmount={totalAmount} />}
        />
      </Loader>
    </Box>
  );
};

export default AmountDisplay;
