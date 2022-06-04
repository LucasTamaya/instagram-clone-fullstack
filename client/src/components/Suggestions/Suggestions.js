import React from "react";

import Suggestion from "../Suggestion/Suggestion";
import user1 from "../../assets/images/user-1.jpeg";
import user2 from "../../assets/images/user-2.jpeg";
import user3 from "../../assets/images/user-3.jpeg";
import user4 from "../../assets/images/user-4.jpeg";
import user5 from "../../assets/images/user-5.jpeg";

function Suggestions() {
  return (
    <div className="hidden md:block w-[400px] ml-5 mt-5">
      <h3 className="text-gray-500 font-bold mb-3">Suggestions For You</h3>
      <div className="flex flex-col gap-y-1">
        <Suggestion userImg={user1} username="Marie" />
        <Suggestion userImg={user2} username="Charles" />
        <Suggestion userImg={user3} username="Ashley" />
        <Suggestion userImg={user4} username="Hannah" />
        <Suggestion userImg={user5} username="Sebastien" />
      </div>
    </div>
  );
}

export default Suggestions;
