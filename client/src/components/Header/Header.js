import React from "react";
import MediaQuery from "react-responsive";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import instagramLogo from "../../assets/images/logo.png";

function Header() {
  return (
    <header
      data-testid="header"
      className="w-full flex justify-between items-center p-2 border-b border-gray-400"
    >
      <MediaQuery maxWidth={799}>
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center" data-testid="smScreen">
          <PhotoCameraOutlinedIcon className="cursor-pointer" />
          <img
            className="w-[100px] "
            src={instagramLogo}
            alt="instagram logo in the header"
          />
          <ChatIcon className="cursor-pointer" />
        </div>
      </MediaQuery>

      <MediaQuery minWidth={800}>
        <div className="w-full max-w-[1000px] mx-auto flex justify-between items-center" data-testid="lgScreen">
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
            <HomeIcon className="cursor-pointer" sx={{ fontSize: 27 }} />
            <ChatIcon className="cursor-pointer" sx={{ fontSize: 27 }} />
            <AddBoxOutlinedIcon
              className="cursor-pointer"
              sx={{ fontSize: 27 }}
            />
            <ExploreIcon className="cursor-pointer" sx={{ fontSize: 27 }} />
            <FavoriteBorderIcon
              className="cursor-pointer"
              sx={{ fontSize: 27 }}
            />
            <div className="w-[30px] h-[30px] rounded-3xl border border-gray-300 cursor-pointer flex justify-center items-start"> {/*a modifier selon la présence d'une photo de profil*/}
                <PermIdentityOutlinedIcon className="text-gray-400" />
            </div>
          </div>
        </div>
      </MediaQuery>
    </header>
  );
}

export default Header;