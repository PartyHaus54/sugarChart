import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import styled from '@emotion/styled';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';

const style = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
};

const modalRowTypographyStyle = {
  width: '40%'
}

const StyledModalHeaderFooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledModalRowDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledHintDiv = styled.a`
  color: lightgray;
`;

const EditReadingModal = ({activeReading, updateReading, deleteReading, userInfo, open, setOpen, toggleView }) => {
  const [readingDate, setReadingDate] = useState(null);
  const [readingTime, setReadingTime] = useState(null);
  const [readingLevel, setReadingLevel] = useState(null);
  const [readingWeight, setReadingWeight] = useState(null);
  const [deleteLocked, setDeleteLocked] = useState(true);

  useEffect(() => {
    var time = new Date(`${activeReading.observed_date}T${activeReading.observed_time}`);
    setReadingTime(time);

    var prematureDate = new Date(activeReading.observed_date);
    var offset = prematureDate.getTimezoneOffset();
    var prEpoch = Date.parse(prematureDate);
    prEpoch += offset * 60000
    var originalDate = new Date(prEpoch);
    setReadingDate(originalDate);

    setReadingLevel(activeReading.glucose_level);
    setReadingWeight(activeReading.weight_at_reading);
  }, [activeReading]);

  const handleCancelClick = () => {
    setOpen(!open);
  };

  const handleSaveClick = () => {
    var epochReadingTime = Date.parse(readingTime);
    var epochDifference = readingTime.getTimezoneOffset() * 60 * 1000;
    epochReadingTime -= epochDifference;
    var observedTime = new Date(epochReadingTime).toISOString().slice(11,19);
    updateReading(readingDate, observedTime, readingLevel, readingWeight);
  };

  const handleDeleteClick = () => {
    deleteReading();
    setDeleteLocked(true);
  };

  return (
      <Modal
        open={open}
        onClose={toggleView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledModalHeaderFooterDiv>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editing Reading:
            </Typography>
            <Button
              variant='outlined'
              color='inherit'
              onClick={e => {
                e.preventDefault();
                handleCancelClick();
              }}
            >
              Cancel
            </Button>
          </StyledModalHeaderFooterDiv>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              value={readingDate}
              onChange={(newDate) => {
                setReadingDate(newDate);
              }}
              renderInput={(params) =>
                <TextField {...params}
                  fullWidth
                  variant="filled"
                />
              }
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileTimePicker
                label="Time"
                value={readingTime}
                onChange={(newTime) => {
                  setReadingTime(newTime);
                }}
                renderInput={(params) =>
                  <TextField {...params}
                    fullWidth
                    variant="filled"
                  />
                }
              />
          </LocalizationProvider>
          <TextField
            id="glucose-level"
            label="Glucose Level"
            type="number"
            variant="filled"
            fullWidth
            defaultValue={readingLevel}
            onChange={(e) => {
              setReadingLevel(e.target.value);
            }}
          />
          {
            userInfo.details.show_weight &&
            <TextField
              id="reading-weight"
              label="Weight at Reading"
              type="number"
              variant="filled"
              fullWidth
              defaultValue={readingWeight}
              onChange={(e) => {
                setReadingWeight(e.target.value);
              }}
            />
          }
          {
            userInfo.details.show_age &&
            <TextField
              id="age-at-reading"
              label="Age (Update Date of Birth In Profile)"
              type="number"
              variant="filled"
              fullWidth
              defaultValue={activeReading.age_at_reading}
              disabled
            />
          }
          <StyledModalHeaderFooterDiv>
            <div>
              <Button
                disabled={deleteLocked}
                color='primary'
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
            </div>
            <Button
              color='primary'
              variant='contained'
              onClick={e => {
                e.preventDefault();
                handleSaveClick();
              }}
            >
              Save
            </Button>
          </StyledModalHeaderFooterDiv>
        </Box>
      </Modal>
  );
}

export default EditReadingModal;