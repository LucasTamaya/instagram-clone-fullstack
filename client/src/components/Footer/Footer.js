import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="w-full fixed bottom-0 left-0 flex justify-between items-center py-3 px-5 bg-gray-200 md:hidden"
    >
      <HomeIcon />
      <SearchOutlinedIcon />
      <Link to="/add-post" className="relative">
        <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
        <AddBoxOutlinedIcon />
      </Link>
      <FavoriteBorderIcon />
      <div className="relative w-[30px] h-[30px] rounded-3xl border border-gray-300 cursor-pointer flex justify-center items-start">
        {/*a modifier selon la présence d'une photo de profil*/}
        <span className="absolute w-2 h-2 right-0 rounded-full bg-red-300 animate-pingSlow"></span>
        <PermIdentityOutlinedIcon className="text-gray-400" />
      </div>
    </footer>
  );
}

export default Footer;
