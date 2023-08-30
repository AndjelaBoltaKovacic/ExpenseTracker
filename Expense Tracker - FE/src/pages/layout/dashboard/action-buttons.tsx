import { AddRounded, Settings } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { _void } from '../../../models/common';

function ActionButtons({ onAdd, onManage }: { onAdd: _void; onManage: _void }) {
  return (
    <Box mt={2} display="flex" flexWrap="wrap" justifyContent={'center'} gap={2}>
      <Button variant="contained" color="secondary" onClick={onAdd}>
        <AddRounded color="primary" /> &nbsp; Add Transaction
      </Button>
      <Button variant="contained" color="secondary" onClick={onManage}>
        <Settings color="primary" />
        &nbsp; Categories
      </Button>
    </Box>
  );
}

export default ActionButtons;
