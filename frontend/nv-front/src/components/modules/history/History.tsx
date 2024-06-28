"use client";
import { useState, useEffect } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { History, SearchHistory } from "@/types/postType";
import { useInView } from "react-intersection-observer";
import Cookies from "js-cookie";
import HistoryCard from "./HCard";
import SearchHistoryCard from "./SHCard";
import "./HStyle.css";

// MUI Components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: History[];
}

interface SearchHistoryApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchHistory[];
}

export default function HistoryPage() {
  const [history, setHistory] = useState<History[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<"activity" | "search">("activity");

  const { ref, inView } = useInView();
  const userToken = Cookies.get("token");

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/history/?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      const data: ApiResponse = await response.json();
      if (response.ok) {
        setHistory((prevHistory) => [...prevHistory, ...data.results]);
        setHasMore(data.next !== null);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/search-history/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      const data: SearchHistoryApiResponse = await response.json();
      if (response.ok) {
        setSearchHistory(data.results);
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view === "activity" && history.length === 0) {
      fetchPosts(page);
    }
  }, [page, view, history.length]);

  useEffect(() => {
    if (inView && hasMore && !isLoading && view === "activity") {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading, view]);

  useEffect(() => {
    if (view === "search" && searchHistory.length === 0) {
      fetchSearchHistory();
    }
  }, [view, searchHistory.length]);

  const clearActivityHistory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/history/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      if (response.ok) {
        setHistory([]);
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/search-history/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      if (response.ok) {
        setSearchHistory([]);
      }
    } catch (error) {
      setError(error as Error);
    }
  };

  const handleClearHistory = () => {
    if (view === "activity") {
      clearActivityHistory();
    } else {
      clearSearchHistory();
    }
    handleCloseDialog();
  };

  const handleDelete = (historyId: number) => {
    setHistory((prevHistory) =>
      prevHistory.filter((item) => Number(item.id) !== historyId)
    );
  };

  const handleSearchDelete = (searchHistoryId: number) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter((item) => Number(item.id) !== searchHistoryId)
    );
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const switchToActivity = () => {
    setView("activity");
    setHasMore(true);
  };

  const switchToSearch = () => {
    setView("search");
    setHasMore(false);
  };

  if (isLoading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full fixed top-[62px] h-full overflow-hidden left-0 z-40">
      <div className="max-w-screen-xl border-x-2 border-slate-800 h-full w-[40%] m-auto py-2 shadow-lg flex flex-col">
        <div className="flex space-x-4 border-b-2 px-4 py-2 border-slate-800">
          <div
            className={`${
              view === "activity"
                ? "bg-main-one text-black"
                : "bg-nav-dark text-white"
            } p-2 rounded-lg font-semibold select-none cursor-pointer`}
            onClick={switchToActivity}
          >
            Activity History
          </div>
          <div
            className={`${
              view === "search"
                ? "bg-main-one text-black"
                : "bg-nav-dark text-white"
            } p-2 rounded-lg font-semibold select-none cursor-pointer`}
            onClick={switchToSearch}
          >
            Search History
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div
            className={`bg-nav-dark p-2 mx-4 rounded-lg cursor-pointer inline-block ${
              view === "activity" ? "" : "invisible pointer-events-none"
            }`}
          >
            <FaRegListAlt className="text-2xl" />
          </div>

          <div
            className="flex bg-nav-dark p-2 mx-4 rounded-lg cursor-pointer items-center"
            onClick={handleOpenDialog}
          >
            <p className="font-semibold">
              Clear {view === "activity" ? "Activity" : "Search"} History
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center mx-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus-within:ring-2 focus-within:ring-main-one">
          <IoSearchSharp className="text-gray-400 ml-2" size={24} />
          <input
            type="text"
            name=""
            id=""
            className="ml-2 p-2 border-0 outline-none w-full bg-transparent text-gray-300 placeholder-gray-500"
            placeholder="Search..."
          />
        </div>

        <div className="flex-1 overflow-y-scroll scrollbar-hide mt-4 px-4">
          {view === "activity" ? (
            history.length > 0 ? (
              history.map((data: History, index: number) => (
                <HistoryCard key={index} data={data} onDelete={handleDelete} />
              ))
            ) : (
              <h1 className="text-center text-2xl text-gray-300">
                No Activity History
              </h1>
            )
          ) : searchHistory.length > 0 ? (
            searchHistory.map((data: SearchHistory, index: number) => (
              <SearchHistoryCard key={index} data={data} onDelete={handleSearchDelete}/>
            ))
          ) : (
            <h1 className="text-center text-2xl text-gray-300">
              No Search History
            </h1>
          )}
          {view === "activity" && <div ref={ref} className="h-10 mb-4"></div>}
        </div>
      </div>

      {/* MUI Dialog Component */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#333", // Dark background
            color: "white", // White text
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Clear All History?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white" }}
          >
            Are you sure you want to clear all your history? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: "#f0f0f0" }}>
            Cancel
          </Button>
          <Button
            onClick={handleClearHistory}
            style={{ color: "#f0f0f0" }}
            autoFocus
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
