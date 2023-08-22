import { Box, Paper, Typography } from '@mui/material';
import { _void } from '../../../models/common';
import ModalButtons from '../../modal/modal-buttons';
import { Expense } from '../../../models/expenses';

function Confirm({
  text,
  data,
  handleBack,
  handleConfirm,
}: {
  text: string;
  handleBack: _void;
  handleConfirm: _void;
  data: any;
}) {
  const { type, category, description, amount } = data;
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
            {category}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Description: </b>
            {description}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Amount: </b> {amount}
          </Typography>
        </Box>
      </Paper>
      <ModalButtons cancelButtonText={'Back'} handleClose={handleBack} handleSubmit={handleConfirm} />
    </>
  );
}

export default Confirm;
