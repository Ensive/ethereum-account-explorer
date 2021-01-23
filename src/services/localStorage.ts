const LS_KEY_ADDRESSES = 'ETH_ADDRESSES';

export function getSearchedAddressesFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LS_KEY_ADDRESSES) || '[]');
}

export function saveSearchedAddressesToLocalStorage(addresses: string[]): void {
  localStorage.setItem(LS_KEY_ADDRESSES, JSON.stringify(addresses));
}
