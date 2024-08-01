"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeHome from "./modules/home/Welcome";
import Post from "./modules/post/PostHome";
import Cookies from "js-cookie";
import { Post as PP } from "@/types/postType";
import { useInView } from "react-intersection-observer";
import Load from "./common/Loading";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PP[];
}

const Home: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PP[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const router = useRouter();
  const { ref, inView } = useInView();

  const userToken = Cookies.get("token");

  const fetchPosts = async (page: number) => {
    if (!userToken) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/predict/posts/?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );

      const data: ApiResponse = await response.json();

      if (response.ok && data && Array.isArray(data.results)) {
        setPosts((prevPosts) => [...prevPosts, ...data.results]);
        setHasMore(data.next !== null);
        setIsAuthorized(true);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setError(new Error("Unexpected API response format"));
        setHasMore(false);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized === null) {
      fetchPosts(1); // Initial call to check authorization and fetch the first page of posts
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

  if (isLoading && isAuthorized === null) {
    return <Load />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {isAuthorized === true ? (
        <div>
          <Post posts={posts} />
          <div className="flex my-4 justify-center" ref={ref}>
            {isLoading && page > 1 && (
              <svg
                width={60}
                height={"auto"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 150"
              >
                <path
                  fill="none"
                  stroke="#D7F64E"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray="300 385"
                  strokeDashoffset="0"
                  d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    calcMode="spline"
                    dur="2s"
                    values="685;-685"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                  ></animate>
                </path>
              </svg>
            )}
          </div>
          {!hasMore && (
            <div className="flex justify-center">
              <h1 className="text-center bg-[#222] font-semibold rounded-2xl px-4 py-2 mb-7 select-none inline hover:text-main-one cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                Currently no new posts. Please check back later.
              </h1>
            </div>
          )}
        </div>
      ) : (
        <WelcomeHome />
      )}
    </>
  );
};

export default Home;
