import React, {useState} from 'react';
import axios from 'axios';

import HeaderBar from '../HeaderBar';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const NewEntry = () => {
  let [glucoseLvl, setGlucoseLvl] = useState('');
  let [observedDate, setObservedDate] = useState('');
  let [observedTime, setObservedTime] = useState('');
  return (
    <React.Fragment>
      <HeaderBar/>
      <Container>
        <h1>New Entry</h1>
        <label>Sugar Level</label>
        <input type="number" id="glucose_level" onChange = {(e)=>{
          setGlucoseLvl(e.target.value);
        }}/>
        <label>Observation Date</label>
        <input type="date" id="observed_date" onChange = {(e)=>{
          setObservedDate(e.target.value);
        }}/>
        <label>Observation Time</label>
        <input type="time" id="observed_time" onChange = {(e)=>{
          setObservedTime(e.target.value);
        }}/>
        <Button onClick={(e)=>{
          e.preventDefault();
          let entry = {};
          entry.glucose_level = glucoseLvl;
          entry.observed_date = observedDate;
          entry.observed_time = observedTime;

          // axios.post('/somePath', entry)
          // .then((res)=>{
          //   console.log(res);
          //   alert('Entry Logged');
          // }).catch(err=>{
          //   console.log(err);
          //   alert('Something went wrong');
          // });

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
        }}>Submit</Button>
      </Container>
    </React.Fragment>
  )
}

export default NewEntry;