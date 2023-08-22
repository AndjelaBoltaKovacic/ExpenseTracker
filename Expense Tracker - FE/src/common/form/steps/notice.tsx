import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import { _void } from '../../../models/common';

function Notice({ success, handleClose, text }: { success?: boolean; text: string; handleClose: _void }) {
  return (
    <Box textAlign="center">
      <Typography margin={3} variant="h5">
        {text}
      </Typography>
      <Box marginY={3}>
        {success ? (
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: '100px' }} />
        ) : (
          <ErrorIcon color="error" sx={{ fontSize: '100px' }} />
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Box>
  );
}

export default Notice;
