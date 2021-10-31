import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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

const StyledHintDiv = styled.a`
  color: lightgray;
`;

const EditReadingModal = ({activeReading, updateReading, deleteReading, userInfo, open, setOpen, toggleView }) => {
  const [readingDate, setReadingDate] = useState('2021-06-14');
  const [readingTime, setReadingTime] = useState('12:00:00');
  const [readingLevel, setReadingLevel] = useState(100);
  const [readingWeight, setReadingWeight] = useState(150);
  const [deleteLocked, setDeleteLocked] = useState(true);

  useEffect(() => {
    setReadingTime(activeReading.observed_time);
    setReadingDate(activeReading.observed_date);
    setReadingLevel(activeReading.glucose_level);
    setReadingWeight(activeReading.weight_at_reading);
  }, [activeReading]);

  const handleCancelClick = () => {
    setOpen(!open);
  };

  const handleSaveClick = () => {
    updateReading(readingDate, readingTime, readingLevel, readingWeight);
  };

  const handleDeleteClick = () => {
    deleteReading();
    setDeleteLocked(true);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggleView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editing Reading: <Button
              variant='outlined'
              color='inherit'
              onClick={e => {
                e.preventDefault();
                handleCancelClick();
              }}
            >
              Cancel
            </Button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Date:
            <input id="observed_date"
              type="date"
              value={readingDate}
              onChange={(e) => {
                setReadingDate(e.target.value);
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Time:
            <input id="observed_time"
              type="time"
              value={readingTime}
              onChange={(e) => {
                setReadingTime(e.target.value);
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sugar Level:
            <input id="reading-level"
              type="number"
              value={readingLevel}
              onChange={(e) => {
                setReadingLevel(Number(e.target.value));
              }}
            />
          </Typography>
          {
            userInfo.details.show_weight &&
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Weight at Reading:
              <input id="reading-weight"
                type="number"
                value={readingWeight}
                onChange={(e) => {
                  setReadingWeight(Number(e.target.value));
                }}
              />
            </Typography>
          }
          {
            userInfo.details.show_age &&
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Age: {activeReading.age_at_reading} <StyledHintDiv>(Update DOB In Profile)</StyledHintDiv>
            </Typography>
          }
          <div>
            <Button
              disabled={deleteLocked}
              color='error'
              variant='contained'
              onClick={e => {
                e.preventDefault();
                handleDeleteClick();
              }}
            >
              Delete
            </Button>
            <Checkbox
              checked={!deleteLocked}
              onChange={() => { setDeleteLocked(!deleteLocked); }}
            />
            <Button
              color='success'
              variant='contained'
              onClick={e => {
                e.preventDefault();
                handleSaveClick();
              }}
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditReadingModal;