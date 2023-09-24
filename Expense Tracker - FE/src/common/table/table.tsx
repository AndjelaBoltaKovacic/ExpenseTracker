import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { DataEntry, _void } from '../../models/common';
import SortLabel from './sort-label';
import SmallTableCell from './small-table-cell';
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
  type,
  params,
  setParams,
  onEdit,
  onDelete
}: {
  disableSort?: boolean;
  hideButtons?: boolean;
    data: Transaction[];
    type?: TransactionType;
    params?: any;
    setParams?: any;
    onEdit?: any;
    onDelete?: any;
}) => {

  const handleSort = (property: keyof DataEntry) => {
    const isAscending = params?.sort === property && params?.order === 'asc';
    setParams({
      ...params, order: isAscending ? 'desc' : 'asc', sort: property 
    });
  };

  const sortedData = data?.slice().sort((a, b) => {
    const aValue = a[params?.orderBy as keyof Transaction];
    const bValue = b[params?.orderBy as keyof Transaction];
    if (aValue < bValue) return params?.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return params?.order === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (transaction: Transaction & { type?: TransactionType }) => {
    onEdit(transaction);
  };

  const handleDelete = (transaction: (Transaction & { type?: TransactionType })) => {
    onDelete(transaction);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '7px', padding: '10px' }}>
        <Table aria-label="Sortable table">
          <TableHead>
            <TableRow>
              <SmallTableCell color="primary.main" content="No." width='10%' />
              {TABLE_HEADERS.map(({ title, property }, i) => (
                <SmallTableCell
                  width={title === 'Category' ? '30%' : '20%'}
                  key={`${title}_${i}`}
                  content={
                    <SortLabel
                      disabled={disableSort}
                      propertyName={property}
                      title={title}
                      handleSort={handleSort}
                      order={params?.order}
                      orderBy={params?.sort}
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
                    <TableButtonCell color="primary" onClick={() => handleEdit({ ...row, type })} text="Edit" />
                    <TableButtonCell color="secondary" onClick={() => handleDelete({ ...row, type })} text="Delete" />
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
