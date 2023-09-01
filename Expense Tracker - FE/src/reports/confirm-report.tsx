import { Box, Typography } from '@mui/material';
import ModalButtons from '../common/modal/modal-buttons';
import { _void } from '../models/common';

const ConfirmReport = ({ text, onConfirm, onClose }: { text: string; onConfirm: _void; onClose: _void }) => {
  return (
    <Box textAlign='center' pb={4}>
      <Typography variant='h5' mb={6}>
        {text}
      </Typography>
      <ModalButtons handleClose={onClose} handleSubmit={onConfirm} />
    </Box>
  );
};

export default ConfirmReport;
