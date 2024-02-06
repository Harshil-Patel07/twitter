import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const index = () => {
  return (
    <div  className="scrollbar-hide max-h-[100vh] overflow-hidden">
      <input
        type="text"
        placeholder="search twitter"
        className="bg-transparent  border rounded shadow-inner bg-white "
      />

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="narendramodi"
        options={{ height: 900 }}
      />
    </div>
  );
};

export default index;
