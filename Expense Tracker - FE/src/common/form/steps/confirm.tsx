import { Box, Paper, Typography } from '@mui/material';
import { _void } from '../../../models/common';
import ModalButtons from '../../modal/modal-buttons';
import { TransactionFormData } from '../../../models/transactions';
import { formatNumberWithDecimal } from '../../../helpers/common';

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
  console.log(data);
  return (
    <>
      <Typography fontSize={20} textAlign="center" padding={2}>
        {text}
      </Typography>
      <Paper elevation={3} sx={{ padding: '16px', maxWidth: '300px', margin: 'auto' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Type: </b>
            {type}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Category: </b>
            {groupName}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Description: </b>
            {name}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Amount: </b> ${formatNumberWithDecimal(amount)}
          </Typography>
        </Box>
      </Paper>
      <ModalButtons cancelButtonText={'Back'} handleClose={handleBack} handleSubmit={handleConfirm} />
    </>
  );
}

export default Confirm;
