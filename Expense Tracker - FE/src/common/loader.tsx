import { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loader({ isLoading, children }: { isLoading: boolean; children: ReactNode }) {
  return isLoading ? (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', marginTop: { xs: '40px', md: '200px' } }}>
      <CircularProgress size="20vw" />
    </Box>
  ) : (
    <>{children}</>
  );
}

export default Loader;
