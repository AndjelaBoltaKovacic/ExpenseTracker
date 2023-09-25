import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Box } from '@mui/material';
import { _void } from '../../../models/common';
import ModalButtons from '../../../common/modal/modal-buttons';
import { TransactionFormData } from '../../../models/transactions';
import CategoryIcon from '../../../common/category-icon';

function Confirm({
  text,
  data,
  handleBack,
  handleConfirm,
}: {
  text: string;
  handleBack: _void;
  handleConfirm: _void;
  data: TransactionFormData;
}) {
  const { type, groupName, name, amount } = data;

  return (
    <>
      <Typography fontSize={20} textAlign='center' paddingBottom={4}>
        {text}
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ maxWidth: '350px', margin: 'auto' }}>
        <Table aria-label='Key Values Table'>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Type:</b>
              </TableCell>
              <TableCell>{type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Category:</b>
              </TableCell>
              <TableCell>
                <Box display='flex' alignItems='center' gap={1}>
                  <CategoryIcon name={groupName} />
                  {groupName}
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Description:</b>
              </TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Amount:</b>
              </TableCell>
              <TableCell>${amount?.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ModalButtons cancelButtonText={'Back'} handleClose={handleBack} handleSubmit={handleConfirm} />
    </>
  );
}

export default Confirm;