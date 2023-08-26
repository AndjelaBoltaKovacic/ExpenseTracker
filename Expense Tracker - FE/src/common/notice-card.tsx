import { Typography, Button, Box } from '@mui/material';
import { _void } from '../models/common';

const NoticeCard = ({
  title,
  text,
  buttonText,
  onButtonClick,
}: {
  title?: string;
  text?: string;
  buttonText?: string;
  onButtonClick?: _void;
}) => {
  return (
    <Box
      border={1}
      borderColor="primary.main"
      borderRadius="7px"
      boxShadow={2}
      p={3}
      margin="auto"
      marginTop="10vw"
      textAlign="center"
      sx={{ width: { xs: '85%', md: '60%' } }}
    >
      <Typography variant="h4" component="div" mb={2}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {text}
      </Typography>
      {buttonText && (
        <Button
          onClick={onButtonClick}
          variant="contained"
          color="secondary"
          style={{
            marginTop: 10,
            borderRadius: '7px',
            height: 48,
            padding: '0 30px',
          }}
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default NoticeCard;
