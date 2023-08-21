import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Expense } from '../../models/expenses';
import { VoidFn } from '../../models/common';
import SortLabel from './sort-label';

type DataEntry = Array<Expense>[number];

const DataTable = ({
  disableSort,
  hideButtons,
  data,
  onEditClick,
  onDeleteClick,
}: {
  disableSort?: boolean;
  hideButtons?: boolean;
  data: Expense[];
  onEditClick?: VoidFn;
  onDeleteClick?: VoidFn;
}) => {
  const [orderBy, setOrderBy] = useState<keyof DataEntry>('creationTime');
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
        <Table aria-label="Sortable table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>
                <SortLabel
                  disabled={disableSort}
                  propertyName="category"
                  title="Category"
                  handleSort={handleSort}
                  order={order}
                  orderBy={orderBy}
                />
              </TableCell>
              <TableCell>
                <SortLabel
                  disabled={disableSort}
                  propertyName="amount"
                  title="Amount"
                  handleSort={handleSort}
                  order={order}
                  orderBy={orderBy}
                />
              </TableCell>
              <TableCell>
                <SortLabel
                  disabled={disableSort}
                  propertyName="description"
                  title="Description"
                  handleSort={handleSort}
                  order={order}
                  orderBy={orderBy}
                />
              </TableCell>
              <TableCell>
                <SortLabel
                  disabled={disableSort}
                  propertyName="creationTime"
                  title="Date"
                  handleSort={handleSort}
                  order={order}
                  orderBy={orderBy}
                />
              </TableCell>
              {!hideButtons && (
                <>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.creationTime}</TableCell>
                {!hideButtons && (
                  <>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={onEditClick && (() => onEditClick(row))}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onDeleteClick && (() => onDeleteClick(row))}
                      >
                        Delete
                      </Button>
                    </TableCell>
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
