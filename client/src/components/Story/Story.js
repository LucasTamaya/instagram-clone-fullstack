import React from "react";

function Story({ userImg, username }) {
  const storyBorderStyle = {
    background: "#f09433",
    background:
      "-moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    background:
      "-webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    background:
      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    filter:
      "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 )",
  };

  return (
    <article>
      <div className="flex flex-col items-center gap-y-1">
        <div className="shrink rounded-full p-[2px] cursor-pointer" style={storyBorderStyle}>
          <div
            className="w-[65px] h-[65px] bg-cover border-2 border-white rounded-full"
            style={{ backgroundImage: `url(${userImg})` }}
          ></div>
        </div>

        <span className="text-xs">{username}</span>
      </div>
    </article>
  );
}

export default Story;

/*
background: #f09433; 
background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
  }
*/
