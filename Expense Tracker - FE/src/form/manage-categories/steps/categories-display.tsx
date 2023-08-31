import { useEffect, useState } from 'react';
import TransactionToggler from '../../../common/toggler/transaction-toggler';
import TransactionService from '../../../services/transaction.service';
import useFetch from '../../../hooks/useFetch';
import CategoriesTable from '../categories-table';
import Loader from '../../../common/loader';
import { Box, Button } from '@mui/material';
import { TransactionGroup } from '../../../models/transactions';
import Notice from '../../steps/notice';
import { _void } from '../../../models/common';

function Manage({ onEdit, onDelete, isExpense, setIsExpense, onAdd }: any) {
  const [groups, setGroups] = useState<any>([] as TransactionGroup[]);
  const { data, error, loading, fetchData } = useFetch<any>(
    isExpense ? TransactionService.getExpenseGroups : TransactionService.getIncomeGroups
  );

  useEffect(() => {
    fetchData();
  }, [isExpense]);

  useEffect(() => {
    data && setGroups(data.content);
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
      {data && <CategoriesTable data={groups} onDeleteClick={onDelete} onEditClick={onEdit} />}
    </Loader>
  );
}

export default Manage;
