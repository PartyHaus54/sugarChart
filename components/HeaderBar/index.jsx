import React from 'react';
import {useRouter} from 'next/Router';
import Box from '@mui/material/Box';

const HeaderBar = props => {
  const router = useRouter();
  return(
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <div onClick={(e)=>{
        router.push('/menu');
      }}>Logo</div>
      <div onClick={(e)=>{
        router.push('/profile');
      }}>Profile</div>
    </Box>
  )
};

export default HeaderBar;
