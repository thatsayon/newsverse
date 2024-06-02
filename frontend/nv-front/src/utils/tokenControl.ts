import Cookies from 'js-cookie';

export const setToken = (token: string): void => {
  Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
};

export const getToken = (): string | undefined => {
  return Cookies.get('token');
};

export const removeToken = (): void => {
  Cookies.remove('token');
};
