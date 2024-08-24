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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: LoginResponse = await response.json();

    const { token, user_info } = data;
    setToken(token); 

    const userData = { user: user_info };
    localStorage.setItem('local:boot', JSON.stringify(userData));
  } catch (error) {
    console.error('Login failed:', error);
    throw error; 
  }
};
