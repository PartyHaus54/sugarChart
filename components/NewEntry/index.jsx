import React from 'react';
import axios from 'axios';

import HeaderBar from '../HeaderBar';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const NewEntry = () => {
  return (
    <React.Fragment>
      <HeaderBar/>
      <Container>
        <h1>New Entry</h1>
        <label>Sugar Level</label>
        <input type="number" id="glucose_level"/>
        <label>Observation Date</label>
        <input type="date" id="observed_date"/>
        <label>Observation Time</label>
        <input type="time" id="observed_time"/>
        <Button onClick={(e)=>{
          e.preventDefault();
          let entry = {};
          entry.glucose_level = document.getElementById('glucose_level').value;
          entry.observed_date = document.getElementById('observed_date').value;
          entry.observed_time = document.getElementById('observed_time').value;
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