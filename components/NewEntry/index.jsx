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
        <Button>Submit</Button>
      </Container>
    </React.Fragment>
  )
}

export default NewEntry;