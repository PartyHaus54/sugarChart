import React from 'react';

import AvgSgrMeter from '../AvgSgrReadingMeter';
import HeaderBar from '../HeaderBar';

import {useRouter} from 'next/router';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';

const Menu = () => {
  const router = useRouter();
  return (
    <Container maxwidth='sm'>
      <HeaderBar />
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <AvgSgrMeter avg={100}/>
        <Button color='secondary' onClick={(e)=>{
          router.push('/charts');
        }}>Charts</Button>
        <Button color='secondary' onClick={(e)=>{
          router.push('/newentry');
        }}>New Entry</Button>
      </Box>
    </Container>
  )
}

export default Menu;