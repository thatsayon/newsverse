"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/predict/posts/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await response.json()
        console.log(data)
        if (response.ok) {
          setIsAuthorized(true);
        } else if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setIsAuthorized(false);
      }

      setIsLoading(false);
    };

    checkAuthorization();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthorized === true ? (
        <AuthorizedComponent />
      ) : (
        <WelcomeComponent />
      )}
    </div>
  );
};

const AuthorizedComponent: React.FC = () => {
  return <div>Welcome to the authorized section!</div>;
};

const WelcomeComponent: React.FC = () => {
  return <div>Welcome to News Verse</div>;
};

export default Home;