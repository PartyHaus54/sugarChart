import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from '@emotion/styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const StyledLoginResponseRowDiv = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
`;

const PasswordFailureModal = ({ title, description, modalOpen, setModalOpen, toggleView }) => {
  const acknowledgements = [
    'Oh, cool',
    'Okay',
    'Got it',
    'Acknowledged',
    'Thanks',
    'I get it',
    'I\'ll try something else',
  ];
  var ack = acknowledgements[Math.floor(Math.random() * acknowledgements.length)];

  const [acknowledgement, setAcknowledgement] = useState(ack);

  const handleClose = () => {
    setModalOpen(false);
  }

  return (
    <Modal
      open={modalOpen}
      onClose={toggleView}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <StyledLoginResponseRowDiv>
          <Button
            color='primary'
            variant='contained'
            onClick={e => {
              e.preventDefault();
              handleClose();
            }}
          >
            {acknowledgement}
          </Button>
        </StyledLoginResponseRowDiv>
      </Box>
    </Modal>
  );
}

export default PasswordFailureModal;