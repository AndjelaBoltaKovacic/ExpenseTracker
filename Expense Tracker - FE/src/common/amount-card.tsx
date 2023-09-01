import { Box, Typography } from '@mui/material';

function AmountCard({ totalAmount }: any) {
  return (
    <Box
      border={1}
      borderColor="primary.main"
      borderRadius="7px"
      boxShadow={2}
      p={{ xs: 1, md: 3 }}
      margin="auto"
      marginTop="10vw"
      textAlign="center"
      mt={4}
      width="100%"
      maxWidth={'340px'}
    >
      <Typography variant="h4" m={1} gutterBottom>
        $ {totalAmount.toFixed(2)}
      </Typography>
      <Typography variant="body1" mx={5} borderTop={1} borderColor="primary.main">
        All-time Ballance
      </Typography>
    </Box>
  );
}

export default AmountCard;
