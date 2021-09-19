import React from 'react';

import AvgSgrMeter from '../AvgSgrReadingMeter';
import HeaderBar from '../HeaderBar';

import { useRouter } from 'next/router'

import Container from '@material-ui/core/Container';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';

const Menu = () => {
  const router = useRouter();
  return (
    <Container fixed>
      <HeaderBar title='Main Menu'/>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <AvgSgrMeter avg={100}/>

        <Button color='secondary' onClick={(e)=>{
          router.push('/charts');
        }}><AssessmentIcon/></Button>
        <Button color='secondary' onClick={(e)=>{
          router.push('/newentry');
        }}><NoteAddIcon/></Button>
      </Box>
    </Container>
  )
}

export default Menu;