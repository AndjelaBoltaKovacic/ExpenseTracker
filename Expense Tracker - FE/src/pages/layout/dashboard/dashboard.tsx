import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import DataTable from '../../../common/table/table';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import NoticeCard from '../../../common/notice-card';

function Dashboard() {
  return (
    <Container>
      <AmountDisplay />
      <Box my={2}>
        <Typography p={2} color="primary.main">
          Last 5 income transactions
        </Typography>
        <DataTable />
      </Box>
      <Box my={2}>
        <Typography p={2} color="primary.main">
          Last 5 expense transactions
        </Typography>
        <DataTable />
      </Box>
      <NoticeCard title="Weekly reminder" text="some text" />
    </Container>
  );
}

export default Dashboard;
