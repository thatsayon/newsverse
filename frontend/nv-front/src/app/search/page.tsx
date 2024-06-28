"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Post } from "@/types/postType";
import Card from "@/components/common/Card";
import { useInView } from "react-intersection-observer";
import Empty from "@/components/modules/search/Empty";
import { IoTimeOutline } from "react-icons/io5";
import { LiaLanguageSolid } from "react-icons/lia";
import { Menu, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check"; // Import Check icon from Material UI

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export default function PostSearch() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string | null>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);
  const [selectedTime, setSelectedTime] = useState<string>("All time"); // Default time filter
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Both"); // Default language filter
  const { ref, inView } = useInView();
  const userToken = Cookies.get("token");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setSearch(searchParams.get("search"));
    setPage(1);
    setPosts([]);
  }, [searchParams]);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/post/search/?search=${search}&page=${page}`;

    // Add language filter
    if (selectedLanguage && selectedLanguage !== "Both") {
      url += `&lang=${selectedLanguage.toLowerCase()}`;
    }

    // Add time filter
    if (selectedTime && selectedTime !== "All time") {
      if (selectedTime === "Last week") {
        url += "&last_7_days=True";
      } else if (selectedTime === "Last month") {
        url += "&last_30_days=True";
      }
    }

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      if (!response.ok) {
        console.log(await response.json());
        return;
      }
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
  }, [page, router, search, selectedTime, selectedLanguage]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickMenu1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuE2 = () => {
    setAnchorE2(null);
  };

  const handleClickMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time); 
    setPage(1); 
    setPosts([]); 
    handleCloseMenu();
  };

  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setPage(1); 
    setPosts([]); 
    handleCloseMenuE2();
  };

  if (search?.length === 0) return <Empty />;
  if (isLoading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="mx-4 flex my-4">
        <div className="inline-block mr-4">
          <div
            onClick={handleClickMenu1}
            className="bg-nav-dark p-2 cursor-pointer hover:text-main-one rounded-lg"
          >
            <IoTimeOutline className="text-3xl" />
          </div>
          <Menu
            id="time-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            // Apply dark theme using Tailwind and sx prop
            sx={{
              ".MuiPaper-root": {
                backgroundColor: "#333", // Dark background color
                color: "white", // White text color
                minWidth: "150px", // Minimum width for better appearance
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
                borderRadius: "8px", // Rounded corners
                marginTop: ".3rem",
              },
            }}
          >
            <MenuItem
              onClick={() => handleSelectTime("All time")}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-semibold">All time</p>
                {selectedTime === "All time" && (
                  <CheckIcon className="ml-auto" fontSize="small" />
                )}
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectTime("Last week")}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-semibold">Last week</p>
                {selectedTime === "Last week" && (
                  <CheckIcon className="ml-auto" fontSize="small" />
                )}
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectTime("Last month")}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-semibold">Last month</p>
                {selectedTime === "Last month" && (
                  <CheckIcon className="ml-auto" fontSize="small" />
                )}
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Language Filter Menu */}
        <div className="inline-block">
          <div
            onClick={handleClickMenu2}
            className="bg-nav-dark p-2 cursor-pointer hover:text-main-one rounded-lg"
          >
            <LiaLanguageSolid className="text-3xl" />
          </div>
          <Menu
            id="language-menu"
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={handleCloseMenuE2}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            // Apply dark theme using Tailwind and sx prop
            sx={{
              ".MuiPaper-root": {
                backgroundColor: "#333", // Dark background color
                color: "white", // White text color
                minWidth: "150px", // Minimum width for better appearance
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
                borderRadius: "8px", // Rounded corners
                marginTop: ".3rem",
              },
            }}
          >
            <MenuItem
              onClick={() => handleSelectLanguage("Both")}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-semibold">Both</p>
                {selectedLanguage === "Both" && (
                  <CheckIcon className="ml-auto" fontSize="small" />
                )}
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectLanguage("bn")}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-semibold">Bangla</p>
                {selectedLanguage === "bn" && (
                  <CheckIcon className="ml-auto" fontSize="small" />
                )}
              </div>
            </MenuItem>
            <MenuItem
              onClick={() => handleSelectLanguage("en")}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-semibold">English</p>
                {selectedLanguage === "en" && (
                  <CheckIcon className="ml-auto" fontSize="small" />
                )}
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-2 mx-4 gap-6">
        {posts.map((post) => (
          <Card key={post.id} post_data={post} />
        ))}
      </div>

      <div className="flex my-4 justify-center" ref={ref}>
        {isLoading && page > 1 && <div>Loading more...</div>}
      </div>

      {!hasMore && !isLoading && (
        <div className="flex justify-center">
          <h1 className="text-center bg-[#222] font-semibold rounded-2xl px-4 py-2 mb-7 select-none inline hover:text-main-one cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            Currently no new posts. Please check back later.
          </h1>
        </div>
      )}
    </>
  );
}
