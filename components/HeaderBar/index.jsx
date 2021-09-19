import React from 'react';
import {useRouter} from 'next/router';

import styled from '@emotion/styled';

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledBox = styled.div`
  font-family: arial;
  color: #22b49f;
  background-color: #f3eece;
  box-shadow: 0px 0px 5px #4040409e;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-content: center;
  button{
    background: none;
    border: none;
    :hover{
      cursor: pointer;
    }
  }
  svg {
    color: #1e9c8a;
    height: 2rem;
    width: 2rem;
  }
`;

const HeaderBar = ({title=''}) => {
  const router = useRouter();
  return(
    <StyledBox>
      <button onClick={(e)=>{
        router.push('/menu');
      }}><HomeIcon/></button>
      <h2>{title}</h2>
      <button onClick={(e)=>{
        router.push('/profile');
      }}><AccountCircleIcon /></button>
    </StyledBox>
  )
};

export default HeaderBar;
