import React, {useState, useEffect} from 'react';
import django from '../../utils/django.js';
import axios from 'axios';

import Modal from '../Modal';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';

const NewEntry = () => {
  let [glucoseLvl, setGlucoseLvl] = useState(null);
  let [observedDate, setObservedDate] = useState(null);
  let [observedTime, setObservedTime] = useState(null);
  let [glucoseLvlError, setGlucoseLvlError] = useState(false);
  let [observedDateError, setObservedDateError] = useState(false);
  let [observedTimeError, setObservedTimeError] = useState(false);
  let [weight, setWeight] = useState(null);
  const [token, setToken] = useState(null);

  let [modalTitle, setModalTitle] = useState('Lord or Lady... whatever their preference is');
  let [modalDescription, setModalDescription] = useState('This is the text to describe what is to be communicated to the user. Please send them good wishes and helpful guidance for their quest');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    var token = django.tokenLoader();
    setToken(token);
  });

  const handleGlucoseLevelChange = (glucoseLvl) => {
    if (glucoseLvl) {
      setGlucoseLvlError(false);
    }
    setGlucoseLvl(glucoseLvl);
  }

  const handleObservedDateChange = (date) => {
    if (date) {
      setObservedDateError(false);
    }
    setObservedDate(date);
  }

  const handleObservedTimeOpen = () => {
    setObservedTime(Date.now());
  }
  
  const handleObservedTimeChange = (time) => {
    if (time) {
      setObservedTimeError(false);
    }
    setObservedTime(time);
  }

  const handleWeightChange = (weight) => {
    setWeight(weight);
  }

  const handleNewEntrySubmissionClick = (e) => {
    e.preventDefault();
    let entry = {};
    var glucoseErr = false;
    if (glucoseLvl) {
      entry.glucose_level = Number(glucoseLvl);
    } else {
      console.log('Entered GLE branch');


      glucoseErr = true;
      setGlucoseLvlError(true);
    }

    if (observedDate) {
      var epochReadingDate = Date.parse(observedDate);
      var epochDateDifference = observedDate.getTimezoneOffset() * 60 * 1000;
      epochReadingDate -= epochDateDifference;

      var parsedObservedDate = new Date(epochReadingDate).toISOString().slice(0, 10);
      entry.observed_date = parsedObservedDate;
    } else {
      console.log('Entered ODE branch');
      setObservedDateError(true);
    }

    if (observedTime) {
      var epochReadingTime = Date.parse(observedTime);
      var epochTimeDifference = observedTime.getTimezoneOffset() * 60 * 1000;
      epochReadingTime -= epochTimeDifference;
      var parsedObservedTime = new Date(epochReadingTime).toISOString().slice(11, 19);
      entry.observed_time = parsedObservedTime;
    } else {
      console.log('Entered OTE branch');
      setObservedTimeError(true);
    }

    entry.weight = weight;

    console.log('Entry', entry);

    if (glucoseLvl && (observedDate && observedTime)) {
      axios({
        method: 'post',
        url: `${django.url}/api/readings/`,
        headers: {
          'Accept': '*/*',
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        data: entry
      })
      .then((res) => {
        setModalTitle('Entry Submitted');
        setModalDescription('Thank you for your Entry');
        setOpen(true);
      }).catch(err => {
        console.log('An error happened', err);
      });
    } else {
      console.log('All 3 not true');
    }

    //validate the fields
    //if form is filled out correctly
    //send the completed reading record to the db
    //upon successful completion
    //let the user know their reading was successfully updated
    //redirect them to the chart for the day
    //if record was not logged
    //notify the user what went wrong
    //if form is not complete
    //notify user what field they need to fill out
    console.log(entry);
    // setModalTitle('Entry Submitted');
    // setModalDescription('Thank you for your Entry');
    // setOpen(true);
  }

  return (
    <React.Fragment>
      <Modal title={modalTitle}
        description={modalDescription}
        open={open}
        toggleView={()=>{ setOpen(!open); }}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '75vh'
      }}>
        <TextField
          id="glucose-level"
          label="Glucose Level"
          required
          error={glucoseLvlError}
          type="number"
          variant="filled"
          fullWidth
          defaultValue={null}
          onChange={(e) => {
            handleGlucoseLevelChange(String(e.target.value));
          }}
        />
        {/* <label>Sugar Level</label>
        <input type="number" id="glucose_level" onChange = {(e)=>{
          setGlucoseLvl(Number(e.target.value));
        }}/> */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date"
            value={observedDate}
            required
            onOpen={() => { setObservedDate(Date.now()) }}
            onChange={(newDate) => {
              handleObservedDateChange(newDate);
            }}
            renderInput={(params) =>
              <TextField {...params}
                required
                fullWidth
                error={observedDateError}
                variant="filled"
              />
            }
          />
        </LocalizationProvider>
        {/* <label>Observation Date</label>
        <input type="date" id="observed_date" onChange = {(e)=>{
          setObservedDate(e.target.value);
        }}/> */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileTimePicker
            label="Time"
            value={observedTime}
            requred
            onOpen={handleObservedTimeOpen}
            onChange={(newTime) => {
              handleObservedTimeChange(newTime);
            }}
            renderInput={(params) =>
              <TextField {...params}
                required
                error={observedTimeError}
                fullWidth
                variant="filled"
              />
            }
          />
        </LocalizationProvider>
        {/* <label>Observation Time</label>
        <input type="time" id="observed_time" onChange = {(e)=>{
          setObservedTime(e.target.value);
        }}/> */}
        <TextField
          id="weight-at-reading"
          label="Weight"
          type="number"
          color="secondary"
          variant="filled"
          defaultValue={null}
          onChange={(e) => {
            handleWeightChange(String(e.target.value));
          }}
        />
        <Button
          variant="contained"
          onClick={(e)=>{handleNewEntrySubmissionClick(e)}}
        >
          Submit
        </Button>
      </Box>
    </React.Fragment>
  )
}

export default NewEntry;