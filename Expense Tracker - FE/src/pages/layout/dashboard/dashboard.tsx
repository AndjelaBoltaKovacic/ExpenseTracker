import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import DataTable from '../../../common/table/table';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import NoticeCard from '../../../common/notice-card';
import { useUserContext } from '../../../contexts/userContext';

function Dashboard() {
  const { isPremium } = useUserContext();
  return (
    <Container>
      <AmountDisplay />
      <Box mt={2} display='flex' justifyContent='end'>
        <Button variant='contained' color='secondary'>
          Add Transaction
        </Button>
      </Box>

      <Box my={2}>
        <Typography p={2} color='primary.main'>
          Last 5 income transactions
        </Typography>
        <DataTable />
      </Box>
      <Box my={2}>
        <Typography p={2} color='primary.main'>
          Last 5 expense transactions
        </Typography>
        <DataTable />
      </Box>
      {isPremium && <NoticeCard title='Weekly reminder' text='some text' />}
    </Container>
  );
}

export default Dashboard;
