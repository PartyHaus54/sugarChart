import React from 'react';

import styled from '@emotion/styled';

import Image from 'next/image';

import logo from '../../public/logo.png';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledDiv = styled.div`
  font-family: arial;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  max-width: 30rem;
  margin: 0 auto;
  h1{
    color: #1e7373;
    padding: 3rem 1rem 1rem 1rem;
  }
  div {
    .logo {
      filter: opacity(.25);
    }
  }
  form{
    button{
      background-color: #f3eece;
    }
  }
  p {
    color: #475f5b;
  }
`;

import { useRouter } from 'next/router';

const LogIn = () => {
  const router = useRouter();

  return (
    <StyledDiv>
      {/* <img src={logo}/> */}
      <h1>Sugar Chart</h1>
      <div>
        <Image className='logo' src={logo} alt='butterfly logo'/>
      </div>
      <form>
        <TextField
          required
          id='username'
          label='username'
          variant='filled'
          fullWidth
        />
        <TextField
          id='password'
          label='password'
          type='password'
          autoComplete='current-password'
          variant='filled'
          margin='normal'
          fullWidth
        />
        <Button
          variant='contained'
          onClick={e => {
            e.preventDefault();
            router.push('menu');
          }}
        >
          Sign In
        </Button>
        <p>🚧🚧This page is still under construction. No user name or password is required. Please select the Sign In button to enter🚧🚧</p>
      </form>
    </StyledDiv>
  )
}

export default LogIn;