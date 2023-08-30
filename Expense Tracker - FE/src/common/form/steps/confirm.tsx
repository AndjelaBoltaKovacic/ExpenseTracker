import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { _void } from '../../../models/common';
import ModalButtons from '../../modal/modal-buttons';
import { TransactionFormData } from '../../../models/transactions';

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
      <Typography fontSize={20} textAlign="center" padding={2}>
        {text}
      </Typography>
      <TableContainer component={Paper} elevation={3} sx={{ maxWidth: '350px', margin: 'auto' }}>
        <Table aria-label="Key Values Table">
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
              <TableCell>{groupName}</TableCell>
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
              <TableCell>${amount.toFixed()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ModalButtons cancelButtonText={'Back'} handleClose={handleBack} handleSubmit={handleConfirm} />
    </>
  );
}

export default Confirm;
