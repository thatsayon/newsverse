import { useState } from "react";
import { SearchHistory } from "@/types/postType";
import formatDate from "@/utils/format";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";

interface SerachHistoryProps {
  data: SearchHistory;
  onDelete: (searchHistoryId: number) => void;
}
const SearchHistoryCard: React.FC<SerachHistoryProps> = ({
  data,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [error, setError] = useState<Error | null>(null);

  const userToken = Cookies.get("token");

  const removeSingleHisotry = async (history_id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/search-history/${history_id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      if (response.ok) {
        onDelete(history_id);
      }
    } catch (error) {
      setError(error as Error);
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    removeSingleHisotry(Number(data.id));
    handleCloseMenu();
  };
  return (
    <>
      <div className="flex items-center mx-2 my-4 justify-between border-b-2 pb-4 border-slate-800">
        <div>
          <h1 className="text-xl mb-1">
            <span className="font-semibold">{data?.user.username}</span>{" "}
            searched for{" "}
            <span className="font-semibold text-main-one">
              {data?.searched_text}
            </span>
          </h1>
          <p className="text-sm">{formatDate(data?.created_at)}</p>
        </div>
        <div>
          <div
            className="mt-2 ml-4 p-2 rounded-full hover:bg-nav-dark cursor-pointer"
            onClick={handleClick}
          >
            <BsThreeDots className="text-2xl text-gray-600" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              ".MuiPaper-root": {
                backgroundColor: "#333",
                color: "white",
                minWidth: "200px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                marginTop: ".2rem",
              },
            }}
          >
            <MenuItem
              onClick={handleDelete}
              sx={{ ":hover": { backgroundColor: "#444" } }}
            >
              <div className="flex items-center">
                <FaRegTrashAlt className="text-xl mr-4" />
                <p className="font-semibold">Delete</p>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default SearchHistoryCard;
