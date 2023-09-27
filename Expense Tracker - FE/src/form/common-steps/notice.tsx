import { Box, Button, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorIcon from '@mui/icons-material/Error';
import { _void } from '../../models/common';
import { Outcome } from '../../values/enums/form-steps';
import { useEffect } from 'react';
import cashRegisterSound from '../../assets/audio/cash-register-purchase-87313.mp3';


function Notice({
  outcome,
  handleClose,
  text,
  details,
  btnText = 'Close',
  playAudio,
}: {
  outcome?: Outcome;
  text?: string;
  details?: string;
  handleClose: _void;
  btnText?: string;
  playAudio?: boolean;
}) {

  const audio = new Audio(cashRegisterSound);


  useEffect(() => {
    if (outcome === Outcome.Success && playAudio) {
      audio.play();
    }
  }, [outcome])


  return (
    <Box textAlign='center'>
      <Typography margin={3} variant='h5'>
        {text}
      </Typography>
      <Typography margin={3} variant='body1'>
        {details}
      </Typography>
      {outcome && (
        <Box marginY={3}>
          {outcome === Outcome.Success ? (
            <CheckCircleRoundedIcon color='success' sx={{ fontSize: '120px' }} />
          ) : (
            <ErrorIcon color='error' sx={{ fontSize: '120px' }} />
          )}
        </Box>
      )}
      <Box display='flex' justifyContent='center' mt={8}>
        <Button variant='contained' color='primary' size='large' onClick={handleClose}>
          {btnText}
        </Button>
      </Box>
    </Box>
  );
}

export default Notice;
