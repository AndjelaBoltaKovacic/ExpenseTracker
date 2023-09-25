import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { _void } from '../../../models/common';
import { TransactionGroup } from '../../../models/transactions';
import ModalButtons from '../../../common/modal/modal-buttons';
import CategoryIcon from '../../../common/category-icon';

function Confirm({
  isExpense,
  text,
  group,
  handleBack,
  handleConfirm,
}: {
  isExpense: boolean;
  text: string;
  handleBack: _void;
  handleConfirm: _void;
  group: TransactionGroup;
}) {
  const { name } = group;

  return (
    <>
      <Typography fontSize={20} textAlign='center' paddingY={4}>
        {text}
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ maxWidth: '400px', margin: 'auto' }}>
        <Table aria-label='Key Values Table'>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Type:</b>
              </TableCell>
              <TableCell>{isExpense ? 'Expense' : 'Income'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Category Name:</b>
              </TableCell>
              <TableCell>
                <Box display='flex' alignItems='center' gap={1}>
                  <CategoryIcon name={name} />
                  {name}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ModalButtons cancelButtonText={'Back'} handleClose={handleBack} handleSubmit={handleConfirm} />
    </>
  );
}

export default Confirm;
