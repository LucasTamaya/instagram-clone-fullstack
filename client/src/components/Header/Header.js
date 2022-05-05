import React, { useState } from "react";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HttpsIcon from "@mui/icons-material/Https";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import instagramLogo from "../../assets/images/logo.png";

function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      data-testid="header"
      className="w-full flex justify-between items-center p-2 border-b border-gray-400"
    >
      <MediaQuery maxWidth={768}>
        <div
          className="w-full max-w-[1200px] mx-auto flex justify-between items-center"
          data-testid="smScreen"
        >
          <PhotoCameraOutlinedIcon className="cursor-pointer" />
          <img
            className="w-[100px] "
            src={instagramLogo}
            alt="instagram logo in the header"
          />
          <ChatIcon className="cursor-pointer" />
        </div>
      </MediaQuery>

      <MediaQuery minWidth={769}>
        <div
          className="w-full max-w-[1000px] mx-auto flex justify-between items-center"
          data-testid="lgScreen"
        >
          <img
            className="w-[120px]"
            src={instagramLogo}
            alt="instagram logo in the header"
          />

          <input
            className="bg-gray-200 py-2 px-3 rounded outline-none w-[220px]"
            type="text"
            placeholder="Search"
          />

          <div className="flex items-center gap-x-5">
            <Link to="/" className="relative">
              <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
              <HomeIcon className="cursor-pointer" sx={{ fontSize: 27 }} />
            </Link>
            <ChatIcon className="cursor-pointer" sx={{ fontSize: 27 }} />
            <Link to="/add-post" className="relative">
              <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
              <AddBoxOutlinedIcon
                className="cursor-pointer"
                sx={{ fontSize: 27 }}
              />
            </Link>
            <ExploreIcon className="cursor-pointer" sx={{ fontSize: 27 }} />
            <FavoriteBorderIcon
              className="cursor-pointer"
              sx={{ fontSize: 27 }}
            />
            <div className="relative w-[30px] h-[30px] rounded-3xl border border-gray-300 cursor-pointer flex justify-center items-start">
              {showProfileMenu && (
                <nav className="absolute right-0 top-11 w-[190px] bg-white border-2 border-gray-200 rounded">
                  <ul className="flex flex-col">
                    <li className="p-2 hover:bg-gray-200">
                      <Link
                        to="/my-photos"
                        className="flex items-center gap-x-2"
                      >
                        <InsertPhotoIcon sx={{ fontSize: 20 }} />
                        My photos
                      </Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <Link
                        to="/change-username"
                        className="flex items-center gap-x-2"
                      >
                        <DriveFileRenameOutlineIcon sx={{ fontSize: 20 }} />
                        Change username
                      </Link>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <Link
                        to="/change-password"
                        className="flex items-center gap-x-2"
                      >
                        <HttpsIcon sx={{ fontSize: 20 }} />
                        Change password
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
              <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
              <PermIdentityOutlinedIcon
                className="text-gray-400"
                onClick={() => setShowProfileMenu((curr) => !curr)}
              />
            </div>
          </div>
        </div>
      </MediaQuery>
    </header>
  );
}

export default Header;
