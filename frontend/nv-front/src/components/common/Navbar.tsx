"use client";
import NavLink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NewsVerse from "@/../public/news verse.png";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

// menu needed imports 
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import LockPerson from '@mui/icons-material/LockPerson'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function NavBar(token: any) {
  const pathname = usePathname();
  const router = useRouter();
  const hideNavBarOnPages = ["/login", "/signup", "/recover"];

  const [searchtext, setSearchtext] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Search");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarContent, setAvatarContent] = useState<string>("A");

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  const handleFocus = () => {
    setPlaceholder("Search a post");
  };

  const handleBlur = () => {
    setPlaceholder("Search");
  };

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchtext(e.target.value);
  };

  const handleSearch = () => {
    router.push(`/search?search=${searchtext}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (hideNavBarOnPages.includes(pathname)) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('local:boot');
    if (storedData) {
      try {
        const { user } = JSON.parse(storedData);
        if (user && user.full_name) {
          const firstChar = user.full_name.trim().split(/\s+/).pop().charAt(0);
          setAvatarContent(firstChar);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);


  return (
    <>
      <nav className="flex justify-between py-2 bg-[#121213] rounded-b border-b-2 border-slate-800 overflow-hidden">
        <NavLink href="/">
          <div>
            <Image
              src={NewsVerse}
              alt="news verse"
              width={200}
              height={200}
              className="ml-3"
            />
          </div>
        </NavLink>

        {!!token.token ? (
          <div>
            <div className="flex items-center border-2 px-2 border-slate-800 rounded-lg">
              <FaSearch
                className="mr-2 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                type="text"
                value={searchtext}
                onChange={handleInputchange}
                placeholder={placeholder}
                className="focus:outline-none w-80 h-10"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div>
          {!!token.token ? (
            <>
              {/* <div
                onClick={handleLogout}
                className="text-black font-bold bg-main-one px-4 py-1.5 rounded mx-2 text-xl cursor-pointer"
              >
                <p>Logout</p>
              </div> */}

              <div className="mr-6">
                <ThemeProvider theme={darkTheme}>
                  <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>{avatarContent}</Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: .7,
                        border: 2,
                        borderColor: '#1E2931',
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          borderTop: 2,
                          borderLeft: 2,
                          borderColor: '#1E2931',
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>

                    <Link href="/setting/personal-detail">
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>
                    </Link>

                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <LockPerson fontSize="small" />
                      </ListItemIcon>
                      Privacy & Policy
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </ThemeProvider>

              </div>
            </>
          ) : (
            <>
              <NavLink href="/login" className="font-semibold">
                <div className="text-black bg-main-one px-4 py-1.5 rounded mx-2 text-xl">
                  <p>
                    Login
                  </p>
                </div>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
