import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('shows a friendly welcome text', () => {
  const { queryByText } = render(<App />);

  expect(queryByText('Learn React')).toBeInTheDocument();
});
