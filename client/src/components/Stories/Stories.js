import React from "react";

import user1 from "../../assets/images/user-1.jpeg";
import user2 from "../../assets/images/user-2.jpeg";
import user3 from "../../assets/images/user-3.jpeg";
import user4 from "../../assets/images/user-4.jpeg";
import user5 from "../../assets/images/user-5.jpeg";
import Story from "../Story/Story";

function Stories() {
  return (
    <section className="mt-5 flex justify-evenly items-center w-full max-w-[600px] mx-auto border border-gray-400 p-2 lg:mx-0" data-testid="stories">
      <Story userImg={user1} username="Marie" />
      <Story userImg={user2} username="Charles" />
      <Story userImg={user3} username="Ashley" />
      <Story userImg={user4} username="Hannah" />
      <Story userImg={user5} username="Sebastian" />
    </section>
  );
}

export default Stories;
