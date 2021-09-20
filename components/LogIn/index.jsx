import React, { useState } from 'react';
import djangoUtil from '../../utils/django';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

// import logo from '../public/logo.png';

import { useRouter } from 'next/router';

import axios from 'axios';

const LogIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container fixed>
      {/* <img src={logo}/> */}
      <h1>Sugar Chart</h1>
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
              console.log(document.cookie);
            });
            router.push('menu');
          }}
        >
          Sign In
        </Button>
        <p>🚧🚧This page is still under construction. No user name or password is required. Please select the Sign In button to enter🚧🚧</p>
      </form>
    </Container>
  )
}

export default LogIn;