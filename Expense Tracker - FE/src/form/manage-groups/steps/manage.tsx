import { useEffect, useState } from 'react';
import TransactionToggler from '../../../common/toggler/transaction-toggler';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import GroupsTable from '../groups-table';
import Loader from '../../../common/loader';
import { Box, Button } from '@mui/material';
import { TransactionGroup } from '../../../models/transactions';
import Notice from '../../steps/notice';
import { _void } from '../../../models/common';

function Manage({ onEdit, onDelete, isExpense, setIsExpense, onAdd }: any) {
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
      <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
        <TransactionToggler value={isExpense} onChange={() => setIsExpense((prev: boolean) => !prev)} />
        <Button variant="contained" color="primary" onClick={() => onAdd()}>
          Add Category
        </Button>
      </Box>
      {error && <Notice handleClose={() => fetchData()} btnText="Try again" text="Oops! Something went wrong" />}
      {data && <GroupsTable data={groups} onDeleteClick={onDelete} onEditClick={onEdit} />}
    </Loader>
  );
}

export default Manage;
