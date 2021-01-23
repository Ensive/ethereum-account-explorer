import React from 'react';
import { render, screen } from '@testing-library/react';

import AccountContainer from '../AccountContainer';
import AccountDetails from '../AccountDetails';

test('renders AccountSearch with initial state', () => {
  render(<AccountContainer />);

  const formButtonElement = screen.getByTestId(/search-button/i);
  expect(formButtonElement).toBeInTheDocument();
});

test('renders AccountDetails with initial state', () => {
  render(
    <AccountDetails
      loading={false}
      data={{
        balance: '',
        transactions: [],
      }}
      address={''}
    />,
  );

  const balanceText = screen.getByText(/Balance/i);
  const ethereumAddressText = screen.getByText(/Ethereum Address/i);
  expect(balanceText).toBeInTheDocument();
  expect(ethereumAddressText).toBeInTheDocument();
});
