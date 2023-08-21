import { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loader({ isLoading, size = '12vw', children }: { isLoading: boolean; size?: string; children: ReactNode }) {
  return isLoading ? (
    <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', marginY: { xs: '40px', md: '200px' } }}>
      <CircularProgress size={size} />
    </Box>
  ) : (
    <>{children}</>
  );
}

export default Loader;
