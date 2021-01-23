import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

interface IAccountSearchHistoryProps {
  onAddressHistoryItemClick: (e: React.MouseEvent<HTMLElement>) => void;
  searchedAddresses: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchAddressBox: {
      overflow: 'hidden',
      marginTop: theme.spacing(4),
    },
    listItem: {
      color: '#ccc',
      margin: 0,
      '& span': {
        fontSize: 14,
      },
    },
  }),
);

export default function AccountSearchHistory({
  onAddressHistoryItemClick,
  searchedAddresses,
}: IAccountSearchHistoryProps) {
  const classes = useStyles();
  return (
    <Box className={classes.searchAddressBox}>
      <Typography variant="body2">Search Address History</Typography>

      <List aria-label="recent searched addresses">
        {searchedAddresses.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No search history
          </Typography>
        )}

        {searchedAddresses.length > 0 &&
          searchedAddresses.map((address, index) => (
            <ListItem key={index} button onClick={onAddressHistoryItemClick}>
              <ListItemText className={classes.listItem} primary={address} />
            </ListItem>
          ))}
      </List>
    </Box>
  );
}
