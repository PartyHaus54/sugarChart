import * as React from 'react';
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

const LoginFailureModal = ({ title, description, open, toggleView })  => {
  return (
    <Modal
      open={open}
      onClose={toggleView}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Login Failure
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please Double-Check Your Credentials
        </Typography>
        <StyledLoginResponseRowDiv>
          <Button
            color='primary'
            variant='contained'
            onClick={e => {
              e.preventDefault();
              toggleView();
            }}
          >
            Try Again
          </Button>
          <Button
            disabled={true}
            color='inherit'
            variant='contained'
            onClick={e => {
              e.preventDefault();
            }}
          >
            Reset
          </Button>
        </StyledLoginResponseRowDiv>
      </Box>
    </Modal>
  );
}

export default LoginFailureModal;