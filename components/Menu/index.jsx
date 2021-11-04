import React from 'react';

import DashBoard from './DashBoard';
import GraphicButton from './GraphicButton';

import { useRouter } from 'next/router'

import AssessmentIcon from '@mui/icons-material/Assessment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Box from '@mui/material/Box';

const Menu = () => {
  const router = useRouter();
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <DashBoard dash={100}/>
      <GraphicButton
        content={<AssessmentIcon/>}
        clickHandler={(e)=>{
          router.push('/charts');
      }}/>
      <GraphicButton
        content={<NoteAddIcon/>}
        clickHandler={(e)=>{
          router.push('/newentry');
      }}/>
    </Box>
  )
}

export default Menu;