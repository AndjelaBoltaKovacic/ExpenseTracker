import { Typography, Button, Box } from '@mui/material';
import { VoidFn } from '../models/common';

const NoticeCard = ({
  title,
  text,
  buttonText,
  onButtonClick,
}: {
  title?: string;
  text?: string;
  buttonText?: string;
  onButtonClick?: VoidFn;
}) => {
  return (
    <Box
      border={1}
      borderColor="primary.main"
      borderRadius={4}
      boxShadow={2}
      p={3}
      margin="auto"
      marginTop="10vw"
      textAlign="center"
      sx={{ width: { xs: '85%', md: '60%' } }}
    >
      <Typography variant="h4" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
      <Button
        onClick={onButtonClick}
        variant="contained"
        color="secondary"
        style={{
          marginTop: 10,
          borderRadius: 3,
          color: 'white',
          height: 48,
          padding: '0 30px',
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default NoticeCard;
