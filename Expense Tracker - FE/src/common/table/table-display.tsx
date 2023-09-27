import { Typography } from '@mui/material';
import { TransactionType } from '../../values/enums/transactions';
import NoticeCard from '../cards/notice-card';
import DataTable from './table';
import { Transaction } from '../../models/transactions';

export const TableDisplay = ({ type, data, error }: { type: TransactionType; data: Transaction[]; error: string }) => {
  return (
    <>
      {error ? (
        <NoticeCard
          title={`Oops, there has been an error getting your ${type.toLowerCase()}s`}
          text={'Please try again later'}
        />
      ) : (
        <>
          <Typography p={2} color='primary.main'>
            {`Last 5 ${type} transactions`}
          </Typography>
          <DataTable hideButtons data={data} disableSort />
        </>
      )}
    </>
  );
};
