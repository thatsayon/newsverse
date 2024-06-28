import { History } from "@/types/postType";
import { BsThreeDots } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Cookies from "js-cookie";

interface HistoryCardProps {
  data: History;
  onDelete: (historyId: number) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ data, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [error, setError] = useState<Error | null>(null);

  const userToken = Cookies.get("token");

  const removeSingleHisotry = async (history_id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/history/${history_id}/`,
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
      <div className="mx-2 my-4 flex items-center">
        <div className="flex-shrink-0 min-w-[150px]">
          <img
            src={data?.post.thumbnail || data?.post.thumbnail_url || ""}
            alt="img"
            width={150}
            className="rounded-lg mr-4"
          />
        </div>
        <div className="flex-1">
          <p>
            <span className="font-bold">{data?.user.username}</span>{" "}
            {data?.interaction_type === "upvote"
              ? "upvoted"
              : data?.interaction_type === "downvote"
              ? "downvoted"
              : ""}{" "}
            "{data?.post.title}"
          </p>
        </div>
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
    </>
  );
};

export default HistoryCard;
