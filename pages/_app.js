import React, { useState, useEffect } from 'react';
// import django from '../utils/django.js';
// import axios from 'axios';
// import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme.js';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
