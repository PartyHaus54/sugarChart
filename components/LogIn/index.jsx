import React, { useState } from 'react';
import django from '../../utils/django';

import styled from '@emotion/styled';

import Image from 'next/image';

import logo from '../../public/logo.png';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledLoginDiv = styled.div`
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

const StyledConstructionP = styled.p`
  text-align: center;
`;

import { useRouter } from 'next/router';

import axios from 'axios';

const LogIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <StyledLoginDiv>
      {/* <img src={logo}/> */}
      <h1>Sugar Chart</h1>
      <div>
        <Image className='logo' src={logo} alt='butterfly logo'/>
      </div>
      <form>
        <TextField
          required
          id='username'
          label='Username'
          variant='filled'
          fullWidth
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='filled'
          margin='normal'
          fullWidth
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant='contained'
          onClick={e => {
            e.preventDefault();
            axios({
              method: 'post',
              url: `${django.url}/user/login/`,
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
              },
              data: {
                username: username,
                password: password
              }
            })
            .then(response => {
              document.cookie = `djangoToken=${response.data.token}; SameSite=None; Secure`;
            });
            router.push('menu');
          }}
        >
          Sign In
        </Button>
        <Button
          variant='contained'
          onClick={e => {
            e.preventDefault();
            router.push('signup');
          }}
        >
          Sign Up
        </Button>
        <StyledConstructionP>🚧🚧This page is still under construction.🚧🚧</StyledConstructionP>
      </form>
    </StyledLoginDiv>
  )
}

export default LogIn;