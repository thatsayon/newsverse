"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Post } from "@/types/postType";
import Card from "@/components/common/Card";
import { useInView } from "react-intersection-observer";
import LCard from "@/components/common/LIstCard";
import Load from "@/components/common/Loading";

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
  const [layout, setLayout] = useState<String>("");

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

  const checkLayout = () => {
    try {
      const layout = (JSON.parse(localStorage.getItem('local:customize') || '{}') as { layout?: string }).layout || 'No layout information found.'
      if (layout) {
        setLayout(layout)
      }
    } catch (error) {
      throw error as Error;
    }
  }

  useEffect(() => {
    checkLayout();
  }, [])
  if (isLoading && page === 1) return <Load />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {
        layout === "grid"
          ? (
            <div className="grid lg:grid-cols-5 md:grid-cols-2 m-8 gap-6">
              {posts.map((data) => (
                <Card key={data.id} post_data={data} />
              ))}
            </div>
          ) : (
            <div className="grid grid-rows-1 gap-6 m-8 w-4/6 mx-auto">
              {posts.map((data) => (
                <div className="">
                  <LCard key={data.id} post_data={data} />
                </div>
              ))}
            </div>
          )
      }
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
    </>
  );
}
