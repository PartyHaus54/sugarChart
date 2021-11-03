import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
  const [readingDate, setReadingDate] = useState('2021-06-14');
  const [readingTime, setReadingTime] = useState('12:00:00');
  const [readingLevel, setReadingLevel] = useState(100);
  const [readingWeight, setReadingWeight] = useState(150);
  const [deleteLocked, setDeleteLocked] = useState(true);

  useEffect(() => {
    var time = new Date(`${activeReading.observed_date}T${activeReading.observed_time}`);
    setReadingTime(time);
    setReadingDate(activeReading.observed_date);
    var time = new Date
    setReadingLevel(activeReading.glucose_level);
    setReadingWeight(activeReading.weight_at_reading);
  }, [activeReading]);

  const handleCancelClick = () => {
    setOpen(!open);
  };

  const handleSaveClick = () => {
    var hours = readingTime.getHours();
    var minutes = readingTime.getMinutes();
    var strippedReatingTime= `${hours}:${minutes}:00`;
    updateReading(readingDate, strippedReatingTime, readingLevel, readingWeight);
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
          {/* <StyledModalRowDiv>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}
              style={modalRowTypographyStyle}
            >
              Date:
            </Typography>
            <input id="observed_date"
              type="date"
              value={readingDate}
              onChange={(e) => {
                setReadingDate(e.target.value);
              }}
            />
          </StyledModalRowDiv> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileTimePicker
                label="Time"
                //defaultValue={readingTime}
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
          {/* <StyledModalRowDiv>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Time:
            </Typography>
            <input id="observed_time"
              type="time"
              value={readingTime}
              onChange={(e) => {
                setReadingTime(e.target.value);
              }}
            />
          </StyledModalRowDiv> */}
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
          {/* // <StyledModalRowDiv>
          //   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          //     Sugar Level:
          //   </Typography>
          //   <input id="reading-level"
          //     type="number"
          //     value={String(readingLevel)}
          //     onChange={(e) => {
          //       setReadingLevel(Number(e.target.value));
          //     }}
          //   />
          // </StyledModalRowDiv> */}

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
            // <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            //   Age: {activeReading.age_at_reading} <StyledHintDiv>(Update DOB In Profile)</StyledHintDiv>
            // </Typography>
          }
          <StyledModalHeaderFooterDiv>
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
            </div>
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
          </StyledModalHeaderFooterDiv>
        </Box>
      </Modal>
    </div>
  );
}

export default EditReadingModal;