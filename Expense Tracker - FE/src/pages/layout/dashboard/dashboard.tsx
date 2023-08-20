import Container from '@mui/material/Container';
import AmountDisplay from '../../../common/amount-display';
import DataTable from '../../../common/table/table';
import Box from '@mui/material/Box';

function Dashboard() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box width="100%">
        <AmountDisplay />
      </Box>

      <DataTable />
    </Container>
  );
}

export default Dashboard;
