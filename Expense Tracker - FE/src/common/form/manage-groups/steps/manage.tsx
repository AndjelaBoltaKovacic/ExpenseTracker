import { useEffect, useState } from 'react';
import TransactionToggler from '../../../toggler/transaction-toggler';
import TransactionService from '../../../../services/transaction.service';
import useFetch from '../../../../hooks/useFetch';
import GroupsTable from '../groups-table';
import Loader from '../../../loader';
import { Box } from '@mui/material';
import { TransactionGroup } from '../../../../models/transactions';

function Manage() {
  const [isExpense, setIsExpense] = useState<boolean>(true);
  const [groups, setGroups] = useState<TransactionGroup[]>([] as TransactionGroup[]);
  const { data, error, loading, fetchData } = useFetch<TransactionGroup[]>(
    isExpense ? TransactionService.getExpenseGroups : TransactionService.getIncomeGroups
  );

  useEffect(() => {
    fetchData();
  }, [isExpense]);

  useEffect(() => {
    data && setGroups(data);
  }, [data]);

  return (
    <Loader isLoading={loading}>
      <Box display="flex" justifyContent="center" mt={3} mb={3}>
        <TransactionToggler value={isExpense} onChange={() => setIsExpense((prev) => !prev)} />
      </Box>
      {data && <GroupsTable data={data} onDeleteClick={() => {}} onEditClick={() => {}} />}
    </Loader>
  );
}

export default Manage;
