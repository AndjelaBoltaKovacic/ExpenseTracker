import { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { VoidFn } from '../../models/common';

const CustomModal = ({
  isOpen,
  handleClose,
  title,
  children,
}: {
  isOpen: boolean;
  handleClose: VoidFn;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <Modal open={isOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        <Box
          sx={{
            position: 'absolute',
            marginTop: '100px',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.default',
            borderRadius: '7px',
            padding: '20px',
            outline: 'none',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            width: { xs: '95%', sm: '80%', md: '50%' },
            maxWidth: '552px',
          }}
        >
          <Box textAlign="end" sx={{ cursor: 'pointer' }}>
            <CloseIcon onClick={handleClose} />
          </Box>
          <Typography variant="h4" textAlign="center">
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
