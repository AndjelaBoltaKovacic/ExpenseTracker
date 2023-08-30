import { Box, Paper, Typography } from '@mui/material';
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
      <Typography fontSize={20} textAlign="center" padding={2}>
        {text}
      </Typography>
      <Paper elevation={3} sx={{ padding: '16px', maxWidth: '300px', margin: 'auto' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
            <b>Type: </b>
            {isExpense ? 'Expense' : 'Income'}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="subtitle1" sx={{ marginBottom: '8px' }} display="flex" gap={1}>
            <b>Category Name: </b>
            <Box display="flex" alignItems="center" gap={1}>
              <CategoryIcon name={name} />
              {name}
            </Box>
          </Typography>
        </Box>
      </Paper>
      <ModalButtons cancelButtonText={'Back'} handleClose={handleBack} handleSubmit={handleConfirm} />
    </>
  );
}

export default Confirm;
