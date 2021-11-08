import React, {useState, useEffect} from 'react';
import django from '../../utils/django';
import TimeZoneList from '../TimeZones/TimeZoneList.jsx';
import styled from '@emotion/styled';

import axios from 'axios';

import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import Box from '@mui/material/Box';

const StyledSignUpFooterDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [weight, setWeight] = useState(null);
  const [timezone, setTimeZone] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const handleRegistrationClick = (e) => {
    console.log('Username', username);
    console.log('Password', password);
    console.log('DateOfBirth', dateOfBirth);
    console.log('Weight', weight);
    console.log('Timezone', timezone);
    var parsedDOB = new Date(dateOfBirth).toISOString().slice(0, 10);
    console.log('post REQUEST!!');
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
                date_of_birth: parsedDOB,
                weight: weight,
                timezone: timezone
              }
            });
          });
      });
      router.push('/');
    }
  };

  const handleUsernameChange = (username) => {
    if (username !== '') {
      axios({
        method: 'get',
        url: `${django.url}/check_username/${username}/`,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setUsernameAvailable(response.data);
      });
    }
    setUsername(username);
  }

  const router = useRouter();
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '75vh'
    }}>
      {
        !usernameAvailable
          ?
          <TextField
            required
            error
            helperText="Username Taken"
            id='username'
            label='Username'
            variant='filled'
            fullWidth
            onChange={(e) => {
              handleUsernameChange(e.target.value);
            }}
          />
          :
          <TextField
            required
            id='username'
            label='Username'
            variant='filled'
            fullWidth
            onChange={(e) => {
              handleUsernameChange(e.target.value);
            }}
          />
      }
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
        <MobileDatePicker
          label="Date of Birth"
          value={dateOfBirth}
          onChange={(date) => {
            setDateOfBirth(date);
          }}
          renderInput={(params) =>
            <TextField {...params}
              fullWidth
              variant="filled"
            />
          }
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
      <StyledSignUpFooterDiv>
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
      </StyledSignUpFooterDiv>
    </Box>
  )
}

export default SignUp;