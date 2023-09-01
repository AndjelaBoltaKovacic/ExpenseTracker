import { Dispatch, SetStateAction } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { DataEntry, _void } from '../../models/common';
import SortLabel from './sort-label';
import SmallTableCell from './SmallTableCell';
import { TABLE_HEADERS } from '../../values/constants/table';
import { Transaction } from '../../models/transactions';
import CategoryIcon from '../category-icon';
import { TransactionType } from '../../values/enums/transactions';
import { formatDate } from '../../helpers/date-formatter';
import TableButtonCell from './table-button';

const DataTable = ({
  disableSort,
  hideButtons,
  data,
  onEditClick = () => {},
  onDeleteClick = () => {},
  type,
  orderBy = 'updatedDtm',
  setOrderBy,
  order = 'desc',
  setOrder,
}: {
  disableSort?: boolean;
  hideButtons?: boolean;
  data: Transaction[];
  onEditClick?: _void;
  onDeleteClick?: _void;
  type?: TransactionType;
  orderBy?: string;
  setOrderBy?: Dispatch<SetStateAction<string>>;
  order?: 'asc' | 'desc';
  setOrder?: Dispatch<SetStateAction<'asc' | 'desc'>>;
}) => {
  const handleSort = (property: keyof DataEntry) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder && setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy && setOrderBy(property);
  };

  const sortedData = data?.slice().sort((a, b) => {
    const aValue = a[orderBy as keyof Transaction];
    const bValue = b[orderBy as keyof Transaction];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '7px', padding: '10px' }}>
        <Table aria-label="Sortable table">
          <TableHead>
            <TableRow>
              <SmallTableCell color="primary.main" content="No." />
              {TABLE_HEADERS.map(({ title, property }, i) => (
                <SmallTableCell
                  key={`${title}_${i}`}
                  content={
                    <SortLabel
                      disabled={disableSort}
                      propertyName={property}
                      title={title}
                      handleSort={handleSort}
                      order={order}
                      orderBy={orderBy}
                    />
                  }
                />
              ))}
              {!hideButtons && (
                <>
                  <SmallTableCell />
                  <SmallTableCell />
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, i) => (
              <TableRow key={row.id}>
                <SmallTableCell color="primary.main" content={i + 1} />
                <SmallTableCell content={row.name} />
                <SmallTableCell
                  content={
                    <Box display="flex" alignItems="center">
                      <CategoryIcon name={row.groupName} />
                      &nbsp;
                      {row.groupName}
                    </Box>
                  }
                />
                <SmallTableCell content={`$ ${row.amount?.toFixed(2)}`} />
                <SmallTableCell content={formatDate(row.updatedDtm)} />
                {!hideButtons && (
                  <>
                    <TableButtonCell color="primary" onClick={() => onEditClick({ ...row, type })} text="Edit" />
                    <TableButtonCell color="secondary" onClick={() => onDeleteClick({ ...row, type })} text="Delete" />
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
