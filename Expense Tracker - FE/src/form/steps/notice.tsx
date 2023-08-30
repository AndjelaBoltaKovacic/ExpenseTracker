import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import { _void } from '../../models/common';
import { Outcome } from '../../values/enums/form-steps';

function Notice({
  outcome,
  handleClose,
  text,
  btnText = 'Close',
}: {
  outcome?: Outcome;
  text?: string;
  handleClose: _void;
  btnText?: string;
}) {
  return (
    <Box textAlign="center">
      <Typography margin={3} variant="h5">
        {text}
      </Typography>
      {outcome && (
        <Box marginY={3}>
          {outcome === Outcome.Success ? (
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: '100px' }} />
          ) : (
            <ErrorIcon color="error" sx={{ fontSize: '100px' }} />
          )}
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={8}>
        <Button variant="contained" color="primary" size="large" onClick={handleClose}>
          {btnText}
        </Button>
      </Box>
    </Box>
  );
}

export default Notice;
