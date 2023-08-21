import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { VoidFn } from '../models/common';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

const CustomModal = ({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  children,
}: {
  isOpen: boolean;
  handleClose: VoidFn;
  handleConfirm: VoidFn;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <Modal open={isOpen} aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description'>
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
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
          <Box display='flex' justifyContent='space-between'>
            <Button variant='contained' onClick={handleClose}>
              Close
            </Button>
            <Button variant='contained' color='secondary' onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
