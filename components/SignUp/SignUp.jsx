import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';


import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const StyledSignUpDiv = styled.div`
`;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [age, setAge] = useState(18);
  const [weight, setWeight] = useState(150);
  const [timezone, setTimeZone] = useState('-7');

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
          router.push('/');
        }}
      >
        Cancel
      </Button>
    </StyledSignUpDiv>
  )
}

export default SignUp;