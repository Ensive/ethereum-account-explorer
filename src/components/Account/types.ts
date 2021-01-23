interface IBasicResponse {
  status: string;
  message: string;
}

export interface IAccountBalanceResponse extends IBasicResponse {
  result: string;
}

export interface IAccountTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
}

// todo: fix type
export interface IAccountTransactionsResponse extends IBasicResponse {
  result: IAccountTransaction[];
}

// TODO: split into multiple request types
export interface IApiParams {
  module: 'account';
  action: 'balance' | 'txlist';
  sort?: 'desc' | 'asc';
  apiKey: string;
  address: string;
  offset?: number;
  page?: number;
}

export interface ISearchCriteria {
  address: string;
  network: string;
}

export interface IAccountData {
  balance: string;
  transactions: IAccountTransaction[];
}
