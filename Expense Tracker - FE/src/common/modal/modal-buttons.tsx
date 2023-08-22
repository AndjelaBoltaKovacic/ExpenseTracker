import { Box, Button } from '@mui/material';
import { _void } from '../../models/common';

function modalButtons({
  handleClose,
  handleSubmit,
  disableSubmit,
  cancelButtonText = 'Close',
}: {
  handleClose: _void;
  handleSubmit: _void;
  disableSubmit?: boolean;
  cancelButtonText?: string;
}) {
  return (
    <Box display="flex" justifyContent="center" gap={3} mt={3}>
      <Button variant="contained" color="primary" onClick={handleClose}>
        {cancelButtonText}
      </Button>
      <Button variant="contained" color="secondary" type="submit" onClick={handleSubmit} disabled={disableSubmit}>
        Confirm
      </Button>
    </Box>
  );
}

export default modalButtons;
