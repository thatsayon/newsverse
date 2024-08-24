"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/common/Navbar";
import { FaRegBookmark } from "react-icons/fa6";
import Link from "next/link";
import withAuth from "@/components/modules/auth/withAuth"; // Check import path
import useFetch from "@/hooks/useFetch";
import Cookies from "js-cookie";
import Card from "@/components/common/Card";
import Load from "@/components/common/Loading";

interface Bookmark {
  content: string;
  created_at: string;
  downvote_count: number;
  id: number;
  lang: string;
  slug: string;
  thumbnail: null | string;
  thumbnail_url: null | string;
  title: string;
  topics: string[];
  upvote_count: number;
  user_bookmarked: boolean;
  user_downvoted: boolean;
  user_upvoted: boolean;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bookmark[];
}

const Bookmark: React.FC = () => {
  const [post, setPost] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const axiosFetch = useFetch();

  const userToken = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/bookmark/`, {
          method: 'GET',
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        setPost(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [axiosFetch, userToken]);

  if (isLoading) return <Load />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {!!post?.results[0] == false ? (
        <div className="fixed w-screen overflow-hidden">
          <div className="flex flex-col items-center">
            <FaRegBookmark className="text-6xl opacity-80 mb-3 mt-11" />
            <h1 className="text-3xl mb-3">Your bookmark list is empty.</h1>
            <p className="text-lg sm:w-7/12 md:w-8/12 lg:w-4/12 text-center mb-3">
              Go back to your feed and bookmark posts you’d like to keep or read
              later. Each post you bookmark will be stored here.
            </p>
            <Link
              href="/"
              className="font-bold text-black bg-white px-5 py-3 rounded-lg"
            >
              Back to feed
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-2 m-8 gap-4">
          {post?.results.map((data) => {
            return (
              <>
                <Card post_data={data} />
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Bookmark;
