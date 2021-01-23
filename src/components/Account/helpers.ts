// todo: type 'mainnet' | 'rinkeby' | ''
export function getNetworkHost(networkName: string) {
  return networkName === 'mainnet'
    ? 'api.etherscan.io'
    : 'api-rinkeby.etherscan.io';
}
