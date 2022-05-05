import React from "react";

import "./LandingPageLoading.css";

function LandingPageLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="lds-roller-lg">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LandingPageLoading;
