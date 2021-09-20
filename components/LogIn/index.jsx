import React, { useState } from 'react';
import djangoUtil from '../../utils/django';

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

import axios from 'axios';

const LogIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
<<<<<<< HEAD
          label='Username'
=======
          label='username'
>>>>>>> c88bd09f1ee7231b1aebc46554a151dd54199e83
          variant='filled'
          fullWidth
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          required
          id='password'
          label='password'
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
              console.log(document.cookie);
            });
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