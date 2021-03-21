import fetch from 'node-fetch';

export function getCartItems() {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/customer/1`).then((data) =>
    data.json()
  );
}
