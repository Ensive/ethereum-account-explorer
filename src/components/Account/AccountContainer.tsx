import React, { useState } from 'react';

// material
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

// source
// TODO: introduce custom absolute paths for better DX
import AccountSearch from './AccountSearch';
import AccountDetails from './AccountDetails';
import { getAccountBalance, getAccountTransactions } from './api';
import type {
  IAccountBalanceResponse,
  IAccountData,
  IAccountTransactionsResponse,
  ISearchCriteria,
} from './types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '24px 24px 0',
    },
    alertError: {
      marginBottom: theme.spacing(2),
    },
  }),
);

export default function AccountContainer() {
  // TODO: useReducer ?
  const [address, setAddress] = useState<string>('');
  const [accountData, setAccountData] = useState<IAccountData>({
    balance: 'n/a',
    transactions: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  // todo: fix type and make errors as array of errors to display multiple errors (edge case)
  const [error, setError] = useState<any>('');
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {error && (
        <Alert className={classes.alertError} severity="error">
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={3}>
          <AccountSearch
            onSearch={handleSearch}
            address={address}
            setAddress={setAddress}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={9}>
          <AccountDetails
            loading={loading}
            data={accountData}
            address={address}
          />
        </Grid>
      </Grid>
    </div>
  );

  async function handleSearch({ address, network }: ISearchCriteria) {
    try {
      setError('');
      setLoading(true);
      const balanceResponse: IAccountBalanceResponse = await getAccountBalance({
        address,
        network,
      });
      const transactionsResponse: IAccountTransactionsResponse = await getAccountTransactions(
        {
          address,
          network,
        },
      );

      // todo: improve error handling
      if (balanceResponse.status === '0') {
        setError(balanceResponse.result);
        return;
      }

      // todo: improve redo
      if (transactionsResponse.status === '0') {
        if (Array.isArray(transactionsResponse.result)) {
          setError(transactionsResponse.message);
          // reset previous result on error
          setAccountData({
            balance: 'n/a',
            transactions: [],
          });
        } else {
          setError(transactionsResponse.result);
        }
        return;
      }

      setAccountData({
        balance: balanceResponse.result,
        transactions: transactionsResponse.result,
      });
    } catch (e) {
      // todo: make it available just for dev purpose
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
}
