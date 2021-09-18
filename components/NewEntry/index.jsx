import React from 'react';

import HeaderBar from '../HeaderBar';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const NewEntry = () => {
  return (
    <React.Fragment>
      <HeaderBar/>
      <Container>
        <h1>New Entry</h1>
        <p>Sugar Level</p>
        <p>Date</p>
        <p>Time</p>
        <Button onClick={(e)=>{
          e.preventDefault();
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
          alert('Thank you for submitting your sugar');
        }}>Submit</Button>
      </Container>
    </React.Fragment>
  )
}

export default NewEntry;