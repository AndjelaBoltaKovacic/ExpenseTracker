import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TransactionService from '../services/transaction.service';
import useFetch from '../hooks/useFetch';
import Loader from './loader';

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
    <Box
      border={1}
      borderColor="primary.main"
      borderRadius="7px"
      boxShadow={2}
      p={{ xs: 1, md: 3 }}
      margin="auto"
      marginTop="10vw"
      textAlign="center"
      mt={4}
      width="100%"
      maxWidth={'340px'}
    >
      <Loader isLoading={loading}>
        {error && (
          <Typography variant="body1" mx={5} borderTop={1} borderColor="primary.main">
            An error occured
          </Typography>
        )}
        {totalAmount && (
          <>
            <Typography variant="h4" m={1} gutterBottom>
              $ {totalAmount.toFixed(2)}
            </Typography>
            <Typography variant="body1" mx={5} borderTop={1} borderColor="primary.main">
              Total Amount
            </Typography>
          </>
        )}
      </Loader>
    </Box>
  );
};

export default AmountDisplay;
