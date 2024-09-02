"use client";
import NavLink from "next/link";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import NewsVerse from "@/../public/news verse.png";
import Cookies from "js-cookie";
import { FaSearch, FaBars } from "react-icons/fa";
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
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import LockPerson from '@mui/icons-material/LockPerson'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// icons
import { IoClose, IoHome } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { BiUpvote } from "react-icons/bi";
import { AiOutlineFire } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { RiHistoryFill } from "react-icons/ri";
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '@/utils/customFont.module.css';

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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const userToken = Cookies.get('token');

  const open = Boolean(anchorEl);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const handleSettingsClick = () => {
    const href = isMobileOrTablet ? '/setting' : '/setting/personal-detail';
    router.push(href);
    handleClose(); // Close the menu if needed
  };
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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
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

  if (hideNavBarOnPages.includes(pathname)) {
    return null;
  }

  const goProfile = async () => {
    try {
      let username = JSON.parse(localStorage.getItem("local:boot") || "{}")?.user?.username;

      if (!username) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/get-username/`, {
          method: 'GET',
          headers: {
            Authorization: `Token ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }

        const data = await response.json();
        username = data?.username;
      }

      if (username) {
        router.push(`/${username}`);
      } else {
        throw new Error('Username not found');
      }
    } catch (error) {
      console.log("Unable to get username, redirecting to login...");
      localStorage.removeItem("local:boot");
      router.push('/login');
    }
  };

  const list = () => (
    <Box
      sx={{
        width: '60vw',
        bgcolor: 'black',
        color: 'white',
        height: '100vh',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className="flex justify-end m-3 cursor-pointer">
        <IoClose className="text-2xl" />
      </div>
      <List>
        {[
          { 'name': 'My Feed', 'destination': '/', 'icon': <IoHomeOutline /> },
          { 'name': 'Popular', 'destination': '/popular', 'icon': <AiOutlineFire /> },
          { 'name': 'Most Upvoted', 'destination': '/most-upvoted', 'icon': <BiUpvote /> },
          { 'name': 'Bookmarks', 'destination': '/bookmark', 'icon': <FaRegBookmark /> },
          { 'name': 'History', 'destination': '/history', 'icon': <RiHistoryFill /> },
        ].map((val, key) => (
          <Link href={val.destination}>
            <ListItem button key={key} sx={{ color: 'white' }}>
              <div className="flex items-center">
                <div className="text-xl mr-6">{val.icon}</div>
                <ListItemText primary={<span className="text-xl font-semibold">{val.name}</span>} />
              </div>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <nav className="flex justify-between py-2 bg-[#121213] rounded-b border-b-2 border-slate-800 overflow-hidden">
        {/* Hamburger menu on mobile/tablet screens for logged-in users */}
        {!!token.token && (
          <div className="ml-3 block my-auto lg:hidden">
            <FaBars className="text-white cursor-pointer text-2xl" onClick={toggleDrawer(true)} />
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </div>
        )}

        <NavLink href="/" className="my-auto">
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
          <div className="hidden lg:flex">
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
                    <MenuItem onClick={goProfile}>
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>

                    <MenuItem onClick={handleSettingsClick}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>

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
              {/* Login button on desktop screens */}
              <a href={"/login"} className="font-semibold">
                <div className="text-black bg-main-one px-3 py-1 rounded mx-2 text-2xl hover:bg-main-one-deep">
                  <p className={styles.lalitaOneFont}>Login</p>
                </div>
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
