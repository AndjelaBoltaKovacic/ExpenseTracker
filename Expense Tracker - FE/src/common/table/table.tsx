import { useState } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Button, Paper, Box } from '@mui/material';
import { DataEntry, _void } from '../../models/common';
import SortLabel from './sort-label';
import SmallTableCell from './SmallTableCell';
import { TABLE_HEADERS } from '../../values/constants/table';
import { Transaction } from '../../models/transactions';
import CategoryIcon from '../category-icon';

const DataTable = ({
  disableSort,
  hideButtons,
  data,
  onEditClick,
  onDeleteClick,
}: {
  disableSort?: boolean;
  hideButtons?: boolean;
  data: Transaction[];
  onEditClick?: _void;
  onDeleteClick?: _void;
}) => {
  const [orderBy, setOrderBy] = useState<keyof DataEntry>('createdDtm');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (property: keyof DataEntry) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = data.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '7px' }}>
        <Table aria-label='Sortable table'>
          <TableHead>
            <TableRow>
              <SmallTableCell>No.</SmallTableCell>
              {TABLE_HEADERS.map(({ title, property }, i) => (
                <SmallTableCell key={`${title}_${i}`}>
                  <SortLabel
                    disabled={disableSort}
                    propertyName={property}
                    title={title}
                    handleSort={handleSort}
                    order={order}
                    orderBy={orderBy}
                  />
                </SmallTableCell>
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
                <SmallTableCell>{i + 1}</SmallTableCell>
                <SmallTableCell>{row.name}</SmallTableCell>
                <SmallTableCell>
                  <Box display='flex' alignItems='center' gap={1}>
                    <CategoryIcon name={row.groupName} />
                    {row.groupName}
                  </Box>
                </SmallTableCell>
                <SmallTableCell>$ {row.amount}</SmallTableCell>
                <SmallTableCell>{row.createdDtm}</SmallTableCell>
                {!hideButtons && (
                  <>
                    <SmallTableCell>
                      <Button variant='outlined' color='primary' onClick={onEditClick && (() => onEditClick(row))}>
                        Edit
                      </Button>
                    </SmallTableCell>
                    <SmallTableCell>
                      <Button
                        variant='outlined'
                        color='secondary'
                        onClick={onDeleteClick && (() => onDeleteClick(row))}
                      >
                        Delete
                      </Button>
                    </SmallTableCell>
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
