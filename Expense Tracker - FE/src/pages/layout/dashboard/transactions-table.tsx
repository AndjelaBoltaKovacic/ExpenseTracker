import { Box } from '@mui/material';
import { TableDisplay } from '../../../common/table/table-display';
import { TransactionType } from '../../../values/enums/transactions';
import useFetch from '../../../hooks/useFetch';
import { Transaction } from '../../../models/transactions';
import TransactionService from '../../../services/transaction.service';
import Loader from '../../../common/loader';
import { useState, useEffect } from 'react';

function TransactionsTable({ type }: { type: TransactionType }) {
  const [transactions, setTransaction] = useState<Transaction[]>([] as Transaction[]);
  const { data, error, loading, fetchData } = useFetch<Transaction[]>(
    TransactionService.getIncomes,
    '?page=0&size=5&sort=createdDtm'
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    data && setTransaction(data);
  }, [data]);

  return (
    <Loader isLoading={loading}>
      <Box my={2}>
        <TableDisplay data={transactions} error={error} type={type} />
      </Box>
    </Loader>
  );
}

export default TransactionsTable;
