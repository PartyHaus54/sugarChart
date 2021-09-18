import React from 'react';
import { render, screen } from '@testing-library/react';

import LogIn from '../../components/LogIn/index.jsx';

describe('LogIn', () => {
  test('renders LogIn component', () => {
    render(<LogIn />);

    expect(screen.getByText('Sugar Chart')).toBeInTheDocument();
  });

  test('asserts Username is Required', () => {
    render(<LogIn />);

    expect(screen.getByRole('textbox')).toBeRequired();
  })
});