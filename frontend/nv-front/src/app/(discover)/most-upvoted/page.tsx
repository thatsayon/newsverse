"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Post } from "@/types/postType";
import Card from "@/components/common/Card";
import { useInView } from "react-intersection-observer";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export default function MostUpvoted() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { ref, inView } = useInView();
  const userToken = Cookies.get("token");
  const router = useRouter();

  const fetchPosts = async (page: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/post/most-upvoted/?page=${page}`,
        {
          next: { revalidate: 60 }, 
          method: "GET",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      const data: ApiResponse = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setHasMore(data.next !== null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    router.refresh();
    fetchPosts(page);
  }, [page, router]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

  if (isLoading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 mx-4 gap-4">
        {posts.map((data) => (
          <Card key={data.id} post_data={data} />
        ))}
      </div>
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
        <div>
          <h1>No more post. Come back some time later</h1>
        </div>
      )}
    </>
  );
}
