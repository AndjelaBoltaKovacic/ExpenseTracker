import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Box, Tooltip } from '@mui/material';
import { TransactionGroup } from '../../models/transactions';
import { _void } from '../../models/common';
import CategoryIcon from '../../common/category-icon';
import SmallTableCell from '../../common/table/small-table-cell';
import TableButtonCell from '../../common/table/table-button';

const CategoriesTable = ({
  data,
  onEditClick,
  onDeleteClick,
}: {
  data: TransactionGroup[];
  onEditClick?: any;
  onDeleteClick?: any;
}) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '7px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <SmallTableCell content="No." />
              <SmallTableCell content="Category Name" color="primary.main" />
              <>
                <SmallTableCell />
                <SmallTableCell />
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <Tooltip title={row.type === 'PREDEFINED' ? 'You can only change user-defined categories' : ''}>
                <TableRow key={row.id}>
                  <SmallTableCell color="primary.main" content={i + 1} />
                  <SmallTableCell
                    content={
                      <Box display="flex" alignItems="center">
                        <CategoryIcon name={row.name} />
                        {row.name}
                      </Box>
                    }
                  />
                  <>
                    <>
                      <TableButtonCell
                        color="primary"
                        onClick={() => onEditClick(row)}
                        disabled={row.type === 'PREDEFINED'}
                        text="Edit"
                      />
                      <TableButtonCell
                        color="secondary"
                        onClick={onDeleteClick && (() => onDeleteClick(row, 'delete'))}
                        disabled={row.type === 'PREDEFINED'}
                        text="Delete"
                      />
                    </>
                  </>
                </TableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoriesTable;
