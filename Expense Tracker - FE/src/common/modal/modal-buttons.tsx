import { Box, Button } from '@mui/material';
import { VoidFn } from '../../models/common';

function modalButtons({ handleClose, handleSubmit }: { handleClose: VoidFn; handleSubmit: VoidFn }) {
  return (
    <Box display='flex' justifyContent='center' gap={3} mt={3}>
      <Button variant='contained' color='primary' onClick={handleClose}>
        Close
      </Button>
      <Button variant='contained' color='secondary' type='submit'>
        Confirm
      </Button>
    </Box>
  );
}

export default modalButtons;
