"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {Post} from "@/types/postType"
import Card from "@/components/common/Card";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export default function MostUpvoted() {
  const [posts, setPosts] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const userToken = Cookies.get('token');
  const router = useRouter();
  const fetchPost = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/post/most-upvoted/", {
        method: "GET",
        headers: {
          Authorization: `Token ${userToken}`
        },
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error as Error)
    }
  }

  useEffect(() => {
    fetchPost();
  }, [router])

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 mx-4 gap-4">
        {
          posts?.results.map((data: any) => {
            return(
              <>
              <Card key={data.id} post_data={data} />
              </>
            )
          })
        }
      </div>
    </>
  );
}
