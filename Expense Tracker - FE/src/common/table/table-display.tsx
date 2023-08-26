import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { _void } from '../../models/common';
import { TransactionType } from '../../values/enums/transactions';
import NoticeCard from '../notice-card';
import DataTable from './table';

export const TableDisplay = ({ type, data, error }: { type: TransactionType; data: any; error: string }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <>
      {error ? (
        <NoticeCard title={`Opps, there has been an error fetching your ${type}`} text={'Please try again later'} />
      ) : (
        <>
          <Typography p={2} color="primary.main">
            {`Last 5 ${type} transactions`}
          </Typography>
          <DataTable hideButtons data={[]} disableSort />
        </>
      )}
    </>
  );
};
