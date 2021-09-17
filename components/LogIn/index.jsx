import React from 'react';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
// import { useRouter } from 'next/router';

const LogIn = () => {
  // const router = useRouter();

  return (
    <Container maxwidth='sm'>
      <h1>Sugar Chart</h1>
      <form>
        <TextField
          required
          id='username'
          label='Required'
          defaultValue='Username'
          variant='filled'
          fullWidth
        />
        <TextField
          id='password'
          label='Password'
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
            // router.push('menu');
            console.log('click');
          }}
        >
          Sign In
        </Button>
      </form>
    </Container>
  )
}

export default LogIn;