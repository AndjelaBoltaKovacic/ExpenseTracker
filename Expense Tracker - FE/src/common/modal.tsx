import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

const CustomModal = ({
  isOpen,

  title,
  children,
}: {
  isOpen: boolean;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <Modal open={isOpen} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'background.default',
            borderRadius: '7px',
            padding: '20px',
            outline: 'none',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant='h4' textAlign='center'>
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
