import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { IAccountData } from './types';
import Button from '@material-ui/core/Button';
import AccountQrCodeModal from './AccountQrCodeModal';
import AccountTransactionsTable from './AccountTransactionsTable';

interface IAccountDetailsProps {
  loading: boolean;
  data: IAccountData;
  address: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(3),
    },
    detailItem: {
      marginBottom: theme.spacing(1),
    },
    header: {
      marginBottom: theme.spacing(2),
    },
    loadingContainer: {
      textAlign: 'center',
    },
    noTransactions: {
      marginTop: theme.spacing(2),
    },
    addressButton: {
      cursor: 'pointer',
    },
  }),
);

// naming: Account vs Address ? (i revisited it, and think Account is better)
export default function AccountDetails({
  loading,
  data,
  address,
}: IAccountDetailsProps) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const hasTransactions = data.transactions.length > 0;

  return (
    <Paper className={classes.container}>
      {loading ? renderLoading() : renderAccountDetails()}
    </Paper>
  );

  // todo: refactor out as a loading spinner
  function renderLoading() {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  function renderAccountDetails() {
    return (
      <>
        <header className={classes.header}>
          <div className={classes.detailItem}>
            Ethereum Address: {renderAddress()}
          </div>
          <p className={classes.detailItem}>Balance: {renderBalance()}</p>
        </header>

        <Divider light />

        {hasTransactions ? (
          <AccountTransactionsTable transactions={data.transactions} />
        ) : (
          <Typography
            className={classes.noTransactions}
            variant="body2"
            color="textSecondary"
          >
            No transactions loaded
          </Typography>
        )}

        <AccountQrCodeModal
          modalOpen={modalOpen}
          address={address}
          onClose={onModalClose}
        />
      </>
    );
  }

  function renderAddress() {
    if (!address) return 'n/a';

    return (
      <Button
        onClick={onAddressClickOpenModal}
        color="primary"
        variant="text"
        className={classes.addressButton}
      >
        {address}
      </Button>
    );
  }

  // todo: can be refactored to a separate component
  function renderBalance() {
    const balanceNumber = Number(data.balance);
    if (Number.isFinite(balanceNumber) && !Number.isNaN(balanceNumber)) {
      return (
        <Typography
          component="span"
          display="inline"
          variant="body1"
          color="textSecondary"
        >
          {balanceNumber.toFixed(2)} ETH
        </Typography>
      );
    }

    return data.balance;
  }

  function onAddressClickOpenModal() {
    setModalOpen(true);
  }

  function onModalClose() {
    setModalOpen(false);
  }
}
