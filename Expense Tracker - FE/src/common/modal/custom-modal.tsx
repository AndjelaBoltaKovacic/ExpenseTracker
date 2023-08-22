import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { _void } from '../../models/common';

const CustomModal = ({
  isOpen,
  handleClose,
  title,
  children,
}: {
  isOpen: boolean;
  handleClose: _void;
  title?: string;
  children: ReactNode;
}) => {
  return (
    <Modal open={isOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '300px',
          left: '49%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'background.default',
          borderRadius: '7px',
          padding: '20px',
          outline: 'none',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          width: { xs: '95%', sm: '80%', md: '60%' },
          maxWidth: '600px',
          paddingBottom: '60px',
        }}
      >
        <Box textAlign="end" sx={{ cursor: 'pointer' }}>
          <CloseIcon onClick={handleClose} />
        </Box>
        {title && (
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontSize: '2rem', '@media (min-width:600px)': { fontSize: '2.5rem' } }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
