import React, {useState, useEffect} from 'react';
import django from '../../utils/django';
import styled from '@emotion/styled';

import axios from 'axios';

import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledSignUpDiv = styled.div`
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [timezone, setTimeZone] = useState(null);

  const router = useRouter();
  return (
    <StyledSignUpDiv>
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
        variant='filled'
        fullWidth
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextField
        required
        id='confirm-password'
        label='Confirm Password'
        variant='filled'
        fullWidth
        onChange={(e) => {
          setPasswordConfirmation(e.target.value);
        }}
      />
      <TextField
        id='age'
        label='Age'
        type='number'
        variant='filled'
        fullWidth
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <TextField
        id='weight'
        label='Weight'
        type='number'
        variant='filled'
        fullWidth
        onChange={(e) => {
          setWeight(e.target.value);
        }}
      />
      <TextField
        id='time-zone'
        label='Time Zone'
        variant='filled'
        fullWidth
        onChange={(e) => {
          setTimeZone(e.target.value);
        }}
      />
      <Button
        variant='contained'
        onClick={e => {
          e.preventDefault();
          axios({
            method: 'post',
            url: `${django.url}/register/`,
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            data: {
              username: username,
              password: password
            }
          })
          .then(registerUserResponse => {
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
            .then(loginResponse => {
              document.cookie = `djangoToken=${loginResponse.data.token}; SameSite=None; Secure`;
              axios({
                method: 'post',
                url: `${django.url}/api/user_details/`,
                headers: {
                  'Accept': '*/*',
                  'Authorization': `Token ${loginResponse.data.token}`,
                  'Content-Type': 'application/json'
                },
                data: {
                  age: age,
                  weight: weight,
                  timezone: timezone
                }
              });
            });
          });

          router.push('/');
        }}
      >
        Register
      </Button>
      <Button
        variant='contained'
        onClick={e => {
          e.preventDefault();
          router.push('menu');
        }}
      >
        Cancel
      </Button>
    </StyledSignUpDiv>
  )
}

export default SignUp;