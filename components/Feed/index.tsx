import React, { useState } from "react";
import TwitteBox from "../TwitteBox";
import { Tweet } from "@/typing";
import Twitte from "../Twitte";
import { TfiReload } from "react-icons/tfi";
import { fetchTweets } from "@/utils/fetchTweets";
import toast from "react-hot-toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { deleteSanityDocument } from "../deleteSanityDocument";

interface Props {
  tweets: Tweet[];
}

const index = ({ tweets: tweetsProp }: Props) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  const handleRefresh = async () => {
    const refereshTost = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Feed Updated Successfully !", {
      id: refereshTost,
    });
  };

  return (
    <div className=" h-[100vh] overflow-y-auto w-1/2 px-[1rem] scrollbar-hide ">
      <div className="flex w-full justify-between">
        <h1>Home</h1>
        <p onClick={handleRefresh} className="bg-blue-500">
          <TfiReload />
        </p>
      </div>
      <div className="flex flex-col items-start justify-center w-full ">
      </div>

      <div>
        {tweets.map((tweet, index) => {
      
          return (
            <Twitte
              key={tweet._id}
              tweet={tweet}
              index={index}
              handleRefresh={handleRefresh}
            />
          );
        })}
      </div>
    </div>
  );
};

export default index;
