import React from 'react';
import {useRouter} from 'next/router';

import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HeaderBar = props => {
  const router = useRouter();
  return(
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <div onClick={(e)=>{
        router.push('/menu');
      }}>Logo</div>
      <AccountCircleIcon onClick={(e)=>{
        router.push('/profile');
      }}/>
    </Box>
  )
};

export default HeaderBar;
