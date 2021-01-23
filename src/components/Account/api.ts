import queryString from 'query-string';

import { API_KEY } from '../../global/constants';
import { httpClient } from '../../services/HttpClient';
import { getNetworkHost } from './helpers';
import type {
  IApiParams,
  ISearchCriteria,
} from './types';

export async function getAccountBalance({
  address,
  network,
}: ISearchCriteria): Promise<any> {
  return await httpClient.get(
    apiUrl(
      {
        module: 'account',
        action: 'balance',
        apiKey: API_KEY,
        address,
      },
      getNetworkHost(network),
    ),
  );
}

export async function getAccountTransactions({
  address,
  network,
}: ISearchCriteria): Promise<any> {
  return await httpClient.get(
    apiUrl(
      {
        module: 'account',
        action: 'txlist',
        sort: 'desc',
        apiKey: API_KEY,
        address,
        offset: 10,
        page: 1,
      },
      getNetworkHost(network),
    ),
  );
}

// TODO: move out to a separate module/api helper
function apiUrl(
  params: IApiParams,
  host: 'api.etherscan.io' | 'api-rinkeby.etherscan.io',
) {
  return `https://${host}/api?${queryString.stringify(params)}`;
}
