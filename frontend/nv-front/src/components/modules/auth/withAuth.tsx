"use client"; // Ensure this component is rendered on the client side

import { useRouter } from 'next/navigation'; // Use next/navigation
import { useEffect, ComponentType } from 'react';
import { getToken } from '@/utils/tokenControl';

const withAuth = (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.push('/login'); // Redirect to login if no token is found
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
