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
  const { data, error, loading, fetchData } = useFetch<any>(TransactionService.getTotalAmount);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    data && setTotalAmount(data.totalAmount);
  }, [data]);
  return (
    <Box>
      <Loader isLoading={loading}>
        {error && (
          <Typography variant="body1" mx={5} borderTop={1} borderColor="primary.main">
            An error occured
          </Typography>
        )}
        <Carousel
          content1={<Chart totalIncome={7890} totalExpense={789} />}
          content2={<AmountCard totalAmount={totalAmount} />}
        />
      </Loader>
    </Box>
  );
};

export default AmountDisplay;
