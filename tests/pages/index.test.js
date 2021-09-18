import React from 'react';
import { render, screen } from '@testing-library/react';

import Home from '../../pages/index.js';

describe('Home', () => {
  test('renders Home component', () => {
    render(<Home />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});