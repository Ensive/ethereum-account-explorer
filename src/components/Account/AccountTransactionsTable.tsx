import React from 'react';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import type { IAccountTransaction } from './types';
import { Slide } from '@material-ui/core';

interface IAccountTransactionsTableProps {
  transactions: IAccountTransaction[];
}

export default function AccountTransactionsTable({
  transactions,
}: IAccountTransactionsTableProps) {
  return (
    <TableContainer component="div">
      <Table aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell>Block #</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            {/* todo: update name */}
            <TableCell align="right">Value (amount)</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <Slide
              direction="left"
              in
              timeout={75 * (index + 1)}
              key={transaction.hash}
              mountOnEnter
              unmountOnExit
            >
              <TableRow>
                <TableCell component="th" scope="row">
                  {transaction.blockNumber}
                </TableCell>
                <TableCell>{transaction.from}</TableCell>
                <TableCell>{transaction.to}</TableCell>
                <TableCell align="right">{transaction.value}</TableCell>
                <TableCell align="right">
                  {transaction.txreceipt_status}
                </TableCell>
                <TableCell>{renderDate(transaction.timeStamp)}</TableCell>
              </TableRow>
            </Slide>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function renderDate(timestamp: string) {
  return new Date(Number(timestamp)).toLocaleString();
}
