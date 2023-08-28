import { Table, TableBody, TableContainer, TableHead, TableRow, Button, Paper, Box, Typography } from '@mui/material';
import { TransactionGroup } from '../../../models/transactions';
import { _void } from '../../../models/common';
import CategoryIcon from '../../category-icon';
import SmallTableCell from '../../table/SmallTableCell';

const GroupsTable = ({
  data,
  onEditClick,
  onDeleteClick,
}: {
  data: TransactionGroup[];
  onEditClick?: _void;
  onDeleteClick?: _void;
}) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '7px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <SmallTableCell>
                <Typography component="span" sx={{ color: 'primary.main' }}>
                  No.
                </Typography>
              </SmallTableCell>

              <SmallTableCell>
                <Typography component="span" sx={{ color: 'primary.main' }}>
                  Category Name
                </Typography>
              </SmallTableCell>

              <>
                <SmallTableCell />
                <SmallTableCell />
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={row.id}>
                <SmallTableCell>
                  <Typography component="span" sx={{ color: 'primary.main' }}>
                    {i + 1}
                  </Typography>
                </SmallTableCell>
                <SmallTableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CategoryIcon name={row.name} />
                    {row.name}
                  </Box>
                </SmallTableCell>
                <>
                  <SmallTableCell>
                    <Button variant="outlined" color="primary" onClick={onEditClick && (() => onEditClick(row))}>
                      Edit
                    </Button>
                  </SmallTableCell>
                  <SmallTableCell>
                    <Button variant="outlined" color="secondary" onClick={onDeleteClick && (() => onDeleteClick(row))}>
                      Delete
                    </Button>
                  </SmallTableCell>
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GroupsTable;
