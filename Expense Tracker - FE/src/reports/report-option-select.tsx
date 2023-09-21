import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { ReportStrategy } from './report-generator';
import { _void } from '../models/common';

const ReportOptionSelect = ({ handleChoice }: { handleChoice: _void }) => {
  return (
    <Box textAlign='center' pb={4}>
      <Typography variant='h5' mb={6}>
        How would you like to recieve you report?
      </Typography>
      <Box display='flex' justifyContent='center' gap={2}>
        <Button variant='contained' color='primary' onClick={() => handleChoice(ReportStrategy.Email)}>
          Email
        </Button>
        <Button variant='contained' color='primary' onClick={() => handleChoice(ReportStrategy.PDF)}>
          PDF
        </Button>
      </Box>
    </Box>
  );
};

export default ReportOptionSelect;
