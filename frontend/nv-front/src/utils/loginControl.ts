import axios from 'axios';
import { setToken } from './tokenControl';

interface UserInfo {
  email: string;
  username: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
}

interface LoginResponse {
  token: string;
  expires_in: string;
  user_info: UserInfo;
}

export const login = async (identifier: string, password: string): Promise<void> => {
  try {
    const isEmail = (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    
    const payload = isEmail(identifier)
      ? { email: identifier, password }
      : { username: identifier, password };
    console.log(payload)
    const response = await axios.post<LoginResponse>('http://127.0.0.1:8000/auth/login/', payload);

    const { token, user_info } = response.data;
    setToken(token); 

    const userData = { user: user_info };
    localStorage.setItem('local:boot', JSON.stringify(userData));
  } catch (error) {
    console.error('Login failed:', error);
    throw error; 
  }
};
