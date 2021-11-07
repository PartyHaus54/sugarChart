import React, {useState, useEffect} from 'react';
import django from '../../utils/django.js';
import axios from 'axios';

import Modal from '../Modal';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import { TimePicker } from '@material-ui/pickers';

const NewEntry = () => {
  let [glucoseLvl, setGlucoseLvl] = useState(null);
  let [observedDate, setObservedDate] = useState(null);
  let [observedTime, setObservedTime] = useState(null);
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
    setGlucoseLvl(glucoseLvl);
  }

  const handleNewEntrySubmissionClick = (e) => {
    e.preventDefault();
    let entry = {};
    entry.glucose_level = Number(glucoseLvl);

    var epochReadingDate = Date.parse(observedDate);
    console.log('Reading Time preparse', observedDate);
    var epochDateDifference = observedDate.getTimezoneOffset() * 60 * 1000;
    epochReadingDate -= epochDateDifference;

    var parsedObservedDate = new Date(epochReadingDate).toISOString().slice(0, 10);
    entry.observed_date = parsedObservedDate;

    var epochReadingTime = Date.parse(observedTime);
    console.log('Reading Time preparse', observedTime);
    var epochTimeDifference = observedTime.getTimezoneOffset() * 60 * 1000;
    epochReadingTime -= epochTimeDifference;
    var parsedObservedTime = new Date(epochReadingTime).toISOString().slice(11, 19);
    entry.observed_time = parsedObservedTime;

    entry.weight = weight;

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
      console.log('The new entry response is:', res);
      setModalTitle('Entry Submitted');
      setModalDescription('Thank you for your Entry');
      setOpen(true);
    }).catch(err => {
      console.log(err);
    });

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
          type="number"
          variant="filled"
          fullWidth
          defaultValue={null}
          //value={String(glucoseLvl)}
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
            onOpen={() => { setObservedDate(Date.now()) }}
            onChange={(newDate) => {
              setObservedDate(newDate);
            }}
            renderInput={(params) =>
              <TextField {...params}
                required
                fullWidth
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
            onOpen={() => {console.log(setObservedTime(Date.now()))}}
            onChange={(newTime) => {
              setObservedTime(newTime);
            }}
            renderInput={(params) =>
              <TextField {...params}
                required
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