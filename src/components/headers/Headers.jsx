"use client";
import React, { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useCommonContext } from "@/context/CommonContext";
import axios from "axios";

const Headers = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const { isLoggedIn, setIsLoggedIn, userData } = useCommonContext();

  const [searchValue, setSearchValue] = useState("");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const username = params?.username || searchValue;

  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      setIsLoggedIn(false);
      router.push("/auth/signin");
    }
  };

  const handleSearch = async (username) => {
    if (!username) return;

    try {
      await axios.post("http://localhost:8002/user/search-history", username, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowSearchOverlay(false);
      router.push(`/pages/home/${username}`);
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  useEffect(() => {
    if (searchValue.trim()) {
      handleSearch(searchValue.trim());
    }
  }, []);

  const NavItems = [
    { label: "Overview", path: `/pages/home/${username}` },
    { label: "Repositories", path: `/pages/home/${username}/repositories` },
    { label: "Contribution", path: `/pages/home/${username}/contribution` },
  ];

  return (
    <>
      <div className="top-0 left-0 w-full bg-black text-white h-10 flex items-center justify-center z-20">
        <GitHubIcon fontSize="medium" />
      </div>

      <div className="sticky top-0 h-16 text-black bg-white flex items-center justify-between px-10 z-10">
        <div className="flex items-center gap-2">
          <GitHubIcon fontSize="large" />
          <span className="text-lg font-semibold">Git Profiler</span>
        </div>
        {username && (
          <nav className="flex gap-6 px-4 py-2">
            {NavItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`relative pb-1 transition-all duration-200 font-semibold ease-in-out ${
                  pathname === item.path
                    ? "text-gray-600 border-b-2 border-purple-500"
                    : "text-gray-600 hover:text-gray-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-4">
          <div
            className="relative w-14 h-10 flex items-center cursor-pointer"
            onClick={() => setShowSearchOverlay(true)}
          >
            <SearchIcon
              className="absolute left-3 text-gray-500"
              fontSize="large"
            />
          </div>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => handleMenuItemClick("Logout")}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <button
              onClick={() => router.push("/auth/signin")}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition font-medium"
            >
              Sign in
            </button>
          )}
        </div>

        {showSearchOverlay && (
          <div className="fixed inset-0 bg-white z-50 mt-14 p-4 h-[800px] flex flex-col">
            <div className="relative w-full max-w-3xl  mx-auto mt-8">
              <div className="relative flex items-center border-b border-gray-300 focus-within:border-black w-full">
                <input
                  type="text"
                  placeholder="Search GitHub username"
                  className="flex-1 pl-4 pr-12 py-3 text-lg focus:outline-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoFocus
                />
                <div
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isLoggedIn
                      ? "cursor-pointer animate-bounce"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (isLoggedIn && searchValue.trim()) {
                      handleSearch(searchValue.trim());
                    }
                  }}
                >
                  <SearchIcon
                    fontSize="large"
                    className={isLoggedIn ? "text-gray-600" : "text-gray-300"}
                  />
                </div>
              </div>

              <p className="text-gray-500 mt-8 text-center">
                To search Profile , repositories and projects, Please{" "}
                <span
                  className={` cursor-pointer ${
                    isLoggedIn ? " " : " underline animate-pulse"
                  }`}
                  onClick={() => router.push(`/auth/signin`)}
                >
                  signup/signin.
                </span>
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-full max-w-4xl">
                <p className="text-gray-500 mb-6 text-center">Suggestions</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "Git Profiler Repos (AI)",
                    "Code Suggestions (AI)",
                    "CI/CD",
                    "Git Profiler on AWS",
                    "Git Profiler on Google Cloud",
                    "Why Git Profiler?",
                  ].map((item) => (
                    <div
                      key={item}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-center"
                    >
                      <p className="font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="absolute top-4 right-32 p-2"
              onClick={() => setShowSearchOverlay(false)}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Headers;
