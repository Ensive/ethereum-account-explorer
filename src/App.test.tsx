import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ethereum account explorer title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ethereum account explorer/i);
  expect(linkElement).toBeInTheDocument();
});
