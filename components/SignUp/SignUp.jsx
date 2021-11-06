import React, {useState, useEffect} from 'react';
import django from '../../utils/django';
import TimeZoneList from '../TimeZones/TimeZoneList.jsx';
import styled from '@emotion/styled';

import axios from 'axios';

import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const StyledSignUpDiv = styled.div`
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [weight, setWeight] = useState(null);
  const [timezone, setTimeZone] = useState('UTC');

  const handleRegistrationClick = (e) => {
    e.preventDefault();
    if (password.length > 4 && password === passwordConfirmation) {
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
                date_of_birth: dateOfBirth,
                weight: weight,
                timezone: timezone
              }
            });
          });
      });
      router.push('/');
    }
  };

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
        type='password'
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
        type='password'
        variant='filled'
        fullWidth
        onChange={(e) => {
          setPasswordConfirmation(e.target.value);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
          renderInput={() => <TextField
            id='date-of-birth'
            label='Date of Birth'
            type='date'
            variant='filled'
            fullWidth
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          />}
        />
      </LocalizationProvider>
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
      <TimeZoneList timezone={timezone} setTimeZone={setTimeZone} />
      <Button
        variant='contained'
        onClick={(e) => { handleRegistrationClick(e) }}
      >
        Register
      </Button>
      <Button
        variant='contained'
        onClick={e => {
          e.preventDefault();
          router.push('/');
        }}
      >
        Cancel
      </Button>
    </StyledSignUpDiv>
  )
}

export default SignUp;