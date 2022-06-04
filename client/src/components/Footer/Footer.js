import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HttpsIcon from "@mui/icons-material/Https";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

function Footer() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <footer
      data-testid="footer"
      className="w-full fixed bottom-0 left-0 flex justify-between items-center py-3 px-5 bg-gray-200 md:hidden"
    >
      <Link to="/" className="relative">
        <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
        <HomeIcon />
      </Link>
      <SearchOutlinedIcon />
      <Link to="/add-post" className="relative">
        <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
        <AddBoxOutlinedIcon />
      </Link>
      <FavoriteBorderIcon />
      <div className="relative w-[30px] h-[30px] rounded-3xl border border-gray-300 cursor-pointer flex justify-center items-start">
        {showProfileMenu && (
          <nav className="absolute right-0 bottom-11 w-[190px] bg-white border-2 border-gray-200 rounded">
            <ul className="flex flex-col">
              <li
                className="p-2 hover:bg-gray-200"
                onClick={() => setShowProfileMenu(false)}
              >
                <Link to="/my-photos" className="flex items-center gap-x-2">
                  <InsertPhotoIcon sx={{ fontSize: 20 }} />
                  My photos
                </Link>
              </li>
              <li
                className="p-2 hover:bg-gray-200"
                onClick={() => setShowProfileMenu(false)}
              >
                <Link
                  to="/change-username"
                  className="flex items-center gap-x-2"
                >
                  <DriveFileRenameOutlineIcon sx={{ fontSize: 20 }} />
                  Change username
                </Link>
              </li>
              <li
                className="p-2 hover:bg-gray-200"
                onClick={() => setShowProfileMenu(false)}
              >
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
    </footer>
  );
}

export default Footer;
