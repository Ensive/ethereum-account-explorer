import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';

import AccountDetails from '../AccountDetails';

// mock modal
jest.mock('../AccountQrCodeModal', () => {
  return function () {
    return <div />;
  };
});

test('AccountSearch renders address based on prop', async () => {
  act(() => {
    render(
      <AccountDetails
        loading={false}
        data={{
          balance: '',
          transactions: [],
        }}
        address="0x9F7dfAb2222A473284205cdDF08a677726d786A0"
      />,
    );
  });

  const addressButtonElement = await screen.findByText(
    '0x9F7dfAb2222A473284205cdDF08a677726d786A0',
  );

  await waitFor(() => {
    expect(addressButtonElement).toBeInTheDocument();
  });
});
