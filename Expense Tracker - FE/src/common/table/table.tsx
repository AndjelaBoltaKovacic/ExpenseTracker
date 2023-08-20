import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Expense } from '../../models/expenses';
import { expenses } from '../../services/mocks/expenses';

type DataEntry = Array<Expense>[number];

const DataTable = () => {
  const [orderBy, setOrderBy] = useState<keyof DataEntry>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (property: keyof DataEntry) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = expenses.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Sortable table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={() => handleSort('id')}
              >
                No.
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'group'}
                direction={orderBy === 'group' ? order : 'asc'}
                onClick={() => handleSort('group')}
              >
                Group name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'amount'}
                direction={orderBy === 'amount' ? order : 'asc'}
                onClick={() => handleSort('amount')}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'description'}
                direction={orderBy === 'description' ? order : 'asc'}
                onClick={() => handleSort('description')}
              >
                Description
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'creationTime'}
                direction={orderBy === 'creationTime' ? order : 'asc'}
                onClick={() => handleSort('creationTime')}
              >
                Creation time
              </TableSortLabel>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.group}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.creationTime}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
