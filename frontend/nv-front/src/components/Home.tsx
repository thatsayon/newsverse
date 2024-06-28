"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeHome from "./modules/home/Welcome";
import Post from "./modules/post/PostHome";
import Cookies from "js-cookie";

const Home: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<any[] | null>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuthorization = async () => {
      const userToken = Cookies.get('token');

      if (!userToken) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/predict/posts/", {
          method: "GET",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        });
        const data = await response.json();
        setPosts(data);
        if (response.ok) {
          setIsAuthorized(true);
        } else if (response.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setIsAuthorized(false);
      }
      setIsLoading(false);
    };

    checkAuthorization();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{isAuthorized === true ? <Post posts={posts} /> : <WelcomeHome />}</div>;
};


export default Home;
