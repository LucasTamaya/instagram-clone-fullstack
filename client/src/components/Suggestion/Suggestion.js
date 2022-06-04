import React from "react";

function Suggestion({ userImg, username }) {
  return (
    <div className="flex items-center gap-x-3 p-2 rounded hover:bg-gray-100">
      <div
        className="w-[55px] h-[55px] bg-cover border-2 border-white rounded-full"
        style={{ backgroundImage: `url(${userImg})` }}
      ></div>
      <div className="flex flex-col flex-1">
        <p className="text-xs font-bold">{username}</p>
        <p className="text-xs text-gray-500">Follows you</p>
      </div>
      <button className="text-xs text-blue-500 font-bold">Follow</button>
    </div>
  );
}

export default Suggestion;
