import React, { useState } from 'react';
import django from '../../utils/django';

import LoginFailureModal from '../Modal/LoginFailureModal.jsx';
import PasswordFailureModal from '../Modal/PasswordFailureModal.jsx';

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
  h1 {
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

const StyledButtonRowDiv = styled.div`
  display: flex;
  justify-content: space-around;
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
  const [open, setOpen] = useState(true);
  const [warningOpen, setWarningOpen] = useState(true);

  const warningTitle = 'Disclaimer';
  const warningDescription = 'This site remains under development and resources have not yet been invested for security. Please assume any and all information can be intercepted as you demo this product.';

  return (
    <StyledLoginDiv>
      <PasswordFailureModal
        modalOpen={warningOpen}
        setModalOpen={setWarningOpen}
        toggleView={ () => { setWarningOpen(!warningOpen)}}
        title={warningTitle}
        description={warningDescription}
      />
      {/* <LoginFailureModal
        open={open}
        setOpen={setOpen}
        toggleView={() => { setOpen(!open); }}
      /> */}
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
        <StyledButtonRowDiv>
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
                router.push('menu');
              })
              .catch(err => {
                setOpen(!open);
              });
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
        </StyledButtonRowDiv>
      </form>
    </StyledLoginDiv>
  )
}

export default LogIn;