import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AmountDisplay = () => {
  return (
    <Box
      border={1}
      borderColor="primary.main"
      borderRadius={4}
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
        $ 13452.00
      </Typography>
      <Typography variant="body1" mx={5} borderTop={1} borderColor="primary.main">
        Total Amount
      </Typography>
    </Box>
  );
};

export default AmountDisplay;
