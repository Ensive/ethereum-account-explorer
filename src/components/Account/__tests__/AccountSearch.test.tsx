import React from 'react';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import AccountSearch from '../AccountSearch';

let onSearchMock: () => void;
let setAddressMock: () => void;
let addressMock = 'mocked_address';

beforeEach(() => {
  onSearchMock = jest.fn();
  addressMock = 'mocked_address';
  jest.resetAllMocks();
});

test('AccountSearch renders "required error" if address is empty', async () => {
  addressMock = '';

  render(
    <AccountSearch
      onSearch={onSearchMock}
      address={addressMock}
      setAddress={setAddressMock}
    />,
  );

  const searchButton = screen.getByTestId(/search-button/i);
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText('address is a required field')).toBeInTheDocument();
  });
});

test('AccountSearch renders "this is not valid ethereum address" if address is not valid', async () => {
  addressMock = 'mocked_address';

  render(
    <AccountSearch
      onSearch={onSearchMock}
      address={addressMock}
      setAddress={setAddressMock}
    />,
  );

  const searchButton = screen.getByTestId(/search-button/i);
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(
      screen.getByText('This is not valid Ethereum address'),
    ).toBeInTheDocument();
  });
});

test('AccountSearch renders "required error" if network is empty', async () => {
  addressMock = '0x9F7dfAb2222A473284205cdDF08a677726d786A0';

  render(
    <AccountSearch
      onSearch={onSearchMock}
      address={addressMock}
      setAddress={setAddressMock}
    />,
  );

  const searchButton = screen.getByTestId(/search-button/i);
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText('network is a required field')).toBeInTheDocument();
  });
});

test('AccountSearch calls onSearch prop function on submit and address is added to search history', async () => {
  addressMock = '0x9F7dfAb2222A473284205cdDF08a677726d786A0';

  render(
    <AccountSearch
      onSearch={onSearchMock}
      address={addressMock}
      setAddress={setAddressMock}
    />,
  );

  fireEvent.change(screen.getByTestId('select'), {
    target: {
      value: 'rinkeby',
    },
  });

  fireEvent.click(screen.getByTestId(/search-button/i));

  await waitFor(() => {
    expect(onSearchMock).toBeCalledWith({
      address: addressMock,
      network: 'rinkeby',
    });
    //
    expect(screen.getByText(addressMock)).toBeInTheDocument();
  });
});
