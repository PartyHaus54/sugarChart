import React, {useState, useEffect} from 'react';
import django from '../../utils/django.js';
import axios from 'axios';

import Modal from '../Modal';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const NewEntry = () => {
  let [glucoseLvl, setGlucoseLvl] = useState(0);
  let [observedDate, setObservedDate] = useState('');
  let [observedTime, setObservedTime] = useState('');
  const [token, setToken] = useState(null);

  let [modalTitle, setModalTitle] = useState('Lord or Lady... whatever their preference is');
  let [modalDescription, setModalDescription] = useState('This is the text to describe what is to be communicated to the user. Please send them good wishes and helpful guidance for their quest');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    var token = django.tokenLoader();
    setToken(token);
  });

  const handleNewEntrySubmissionClick = (e) => {
    e.preventDefault();
    let entry = {};
    entry.glucose_level = glucoseLvl;
    entry.observed_date = observedDate;
    entry.observed_time = observedTime;

    axios({
      method: 'post',
      url: `${django.url}/api/readings/`,
      headers: {
        'Accept': '*/*',
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        glucose_level: glucoseLvl,
        observed_date: observedDate,
        observed_time: observedTime
      }
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
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <label>Sugar Level</label>
        <input type="number" id="glucose_level" onChange = {(e)=>{
          setGlucoseLvl(Number(e.target.value));
        }}/>
        <label>Observation Date</label>
        <input type="date" id="observed_date" onChange = {(e)=>{
          setObservedDate(e.target.value);
        }}/>
        <label>Observation Time</label>
        <input type="time" id="observed_time" onChange = {(e)=>{
          setObservedTime(e.target.value);
        }}/>
        <Button onClick={(e)=>{handleNewEntrySubmissionClick(e)}}>Submit</Button>
      </Box>
    </React.Fragment>
  )
}

export default NewEntry;