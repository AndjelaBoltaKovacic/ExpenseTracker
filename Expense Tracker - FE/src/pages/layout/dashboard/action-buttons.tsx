import { AddRounded, Settings } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import { _void } from '../../../models/common';

function ActionButtons({ onAdd, onManage }: { onAdd: _void; onManage: _void }) {
  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant='contained' color='secondary' fullWidth onClick={onAdd}>
            <AddRounded color='primary' /> &nbsp; Add Transaction
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant='contained' color='secondary' fullWidth onClick={onManage}>
            <Settings color='primary' />
            &nbsp; Categories
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ActionButtons;
