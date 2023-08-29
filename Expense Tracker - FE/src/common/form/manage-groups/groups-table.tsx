import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
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
  onEditClick?: any;
  onDeleteClick?: any;
}) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '7px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <SmallTableCell>
                <Typography component='span' sx={{ color: 'primary.main' }}>
                  No.
                </Typography>
              </SmallTableCell>

              <SmallTableCell>
                <Typography component='span' sx={{ color: 'primary.main' }}>
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
              <Tooltip title={row.type === 'PREDEFINED' ? 'You can only change user-defined categories' : ''}>
                <TableRow key={row.id}>
                  <SmallTableCell>
                    <Typography component='span' sx={{ color: 'primary.main' }}>
                      {i + 1}
                    </Typography>
                  </SmallTableCell>
                  <SmallTableCell>
                    <Box display='flex' alignItems='center' gap={1}>
                      <CategoryIcon name={row.name} />
                      {row.name}
                    </Box>
                  </SmallTableCell>
                  <>
                    <>
                      <SmallTableCell>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={onEditClick && (() => onEditClick(row))}
                          disabled={row.type === 'PREDEFINED'}
                        >
                          Edit
                        </Button>
                      </SmallTableCell>
                      <SmallTableCell>
                        <Button
                          variant='outlined'
                          color='secondary'
                          onClick={onDeleteClick && (() => onDeleteClick(row, 'delete'))}
                          disabled={row.type === 'PREDEFINED'}
                        >
                          Delete
                        </Button>
                      </SmallTableCell>
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

export default GroupsTable;
