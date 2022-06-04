import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function ErrorMessage({ message }) {
  const [hideMessage, setHideMessage] = useState(false);

  return (
    <div
      className={`fixed top-[15px] w-fit flex items-center gap-x-2 bg-red-500 p-3 rounded transition ease animate-authTransitionInSm md:top-[50px] md:animate-authTransitionInMd ${
        hideMessage && "opacity-0"
      }`}
    >
      <p className="text-white">{message}</p>
      <CloseIcon
        className="text-white cursor-pointer"
        sx={{ fontSize: 20 }}
        onClick={() => setHideMessage(true)}
      />
    </div>
  );
}

export default ErrorMessage;
