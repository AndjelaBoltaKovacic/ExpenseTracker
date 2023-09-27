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
    <Modal open={isOpen} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
      <Box paddingTop='4vw'>
        <Box
          sx={{
            margin: 'auto',
            backgroundColor: 'background.default',
            borderRadius: '7px',
            padding: '30px',
            outline: 'none',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            width: { xs: '95%', sm: '80%', md: '60%' },
            maxWidth: '600px',
          }}
        >
          <Box textAlign='end' sx={{ cursor: 'pointer' }}>
            <CloseIcon onClick={handleClose} />
          </Box>
          {title && (
            <Typography
              pb={4}
              variant='h5'
              textAlign='center'
              sx={{ fontSize: '2rem', '@media (min-width:600px)': { fontSize: '2.5rem' } }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
