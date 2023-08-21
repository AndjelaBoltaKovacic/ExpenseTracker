import { Box, Button } from '@mui/material';
import { VoidFn } from '../../models/common';

function modalButtons({
  handleClose,
  handleSubmit,
  disableSubmit,
}: {
  handleClose: VoidFn;
  handleSubmit: VoidFn;
  disableSubmit?: boolean;
}) {
  return (
    <Box display='flex' justifyContent='center' gap={3} mt={3}>
      <Button variant='contained' color='primary' onClick={handleClose}>
        Close
      </Button>
      <Button variant='contained' color='secondary' type='submit' onClick={handleSubmit} disabled={disableSubmit}>
        Confirm
      </Button>
    </Box>
  );
}

export default modalButtons;
