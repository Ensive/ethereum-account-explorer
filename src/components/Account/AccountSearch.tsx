import React, { useState } from 'react';
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import * as Yup from 'yup';
// todo: fix, define custom type
// @ts-ignore
import ethereumAddress from 'ethereum-address';

// material
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// source
import type { ISearchCriteria } from './types';
import {
  getSearchedAddressesFromLocalStorage,
  saveSearchedAddressesToLocalStorage,
} from '../../services/localStorage';
import AccountSearchHistory from './AccountSearchHistory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperBox: {
      padding: theme.spacing(4),
    },
    input: {
      marginBottom: theme.spacing(2),
    },
    button: {},
  }),
);

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .required()
    .test('is-address', 'This is not valid Ethereum address', (value) => {
      return ethereumAddress.isAddress(value);
    }),
  network: Yup.string().required(),
});

// todo: optimize
interface IAccountSearchProps {
  onSearch: (params: ISearchCriteria) => void;
  address: string;
  setAddress: (address: string) => void;
}

export default function AccountSearch({
  onSearch,
  address,
  setAddress,
}: IAccountSearchProps) {
  const classes = useStyles();
  const [networkName, setNetworkName] = useState<string>('');
  const [searchedAddresses, setSearchedAddresses] = useState<string[]>(
    getSearchedAddressesFromLocalStorage() || [],
  );

  return (
    <Paper className={classes.paperBox}>
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={{
          address,
          network: networkName,
        }}
        onSubmit={async (
          values: FormikValues,
          helpers: FormikHelpers<ISearchCriteria>,
        ) => {
          await onSearch({ address: values.address, network: values.network });
          saveAddressToHistory(values.address);
          helpers.setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          setFieldValue,
        }: FormikProps<FormikValues>) => {
          return (
            <Form>
              <TextField
                id="address"
                name="address"
                label="Ethereum address"
                value={address}
                error={!!(errors.address && touched.address)}
                helperText={
                  errors.address && touched.address ? errors.address : null
                }
                // todo: refactor/optimize
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue('network', e.target.value);
                  setAddress(e.target.value);
                }}
                className={classes.input}
                fullWidth
                disabled={isSubmitting}
              />
              <TextField
                inputProps={{
                  'data-testid': 'select',
                }}
                id="network"
                name="network"
                label="Network name"
                value={networkName}
                error={!!(errors.network && touched.network)}
                helperText={
                  errors.network && touched.network ? errors.network : null
                }
                // todo: refactor/optimize
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue('network', e.target.value);
                  setNetworkName(e.target.value);
                }}
                className={classes.input}
                fullWidth
                disabled={isSubmitting}
                select
              >
                <MenuItem value="rinkeby">Rinkeby network</MenuItem>
                <MenuItem value="mainnet">Mainnet network</MenuItem>
              </TextField>
              <Button
                data-testid="search-button"
                className={classes.button}
                disableElevation
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress color="inherit" /> : 'Search'}
              </Button>
            </Form>
          );
        }}
      </Formik>

      {/* TODO: make it separate component */}
      <AccountSearchHistory
        onAddressHistoryItemClick={handleAddressHistoryItemClick}
        searchedAddresses={searchedAddresses}
      />
    </Paper>
  );

  // todo: move to a separate component AddressHistory
  function handleAddressHistoryItemClick(e: React.MouseEvent<HTMLElement>) {
    const el = e.target as HTMLElement;
    setAddress(el.textContent || '');
  }

  function saveAddressToHistory(newAddress: string) {
    const storedAddresses = getSearchedAddressesFromLocalStorage();
    const hasInCurrentHistory = storedAddresses.includes(newAddress);
    // store only addresses which are not already in history
    // todo: refactor/optimize
    if (hasInCurrentHistory) {
      const itemIndex = storedAddresses.indexOf(newAddress);
      storedAddresses.splice(itemIndex, 1);
      storedAddresses.unshift(newAddress);
      saveSearchedAddressesToLocalStorage(storedAddresses);
      setSearchedAddresses(storedAddresses);
      return;
    }

    const updatedAddressSearchHistory = [newAddress]
      .concat(storedAddresses)
      .splice(0, 5);

    saveSearchedAddressesToLocalStorage(updatedAddressSearchHistory);
    setSearchedAddresses(updatedAddressSearchHistory);
  }
}
