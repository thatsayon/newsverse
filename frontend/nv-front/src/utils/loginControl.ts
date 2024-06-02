import axios from 'axios';
import { setToken } from './tokenControl';

interface LoginResponse {
  token: string;
}

export const login = async (identifier: string, password: string): Promise<void> => {
  try {
    const isEmail = (input: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    
    const payload = isEmail(identifier)
      ? { email: identifier, password }
      : { username: identifier, password };

    const response = await axios.post<LoginResponse>('http://127.0.0.1:8000/auth/login/', payload);

    const { token } = response.data;
    setToken(token); // Store the token in cookies
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
