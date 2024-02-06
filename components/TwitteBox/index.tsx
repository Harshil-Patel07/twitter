import { Tweet, TweetBody } from "@/typing";
import { fetchTweets } from "@/utils/fetchTweets";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import toast from "react-hot-toast";

import { FaImage } from "react-icons/fa";

import { IoCheckmarkDoneSharp } from "react-icons/io5";


interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

const Index = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  // const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<Boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const addImageToTweet = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    // setImageUrlBoxOpen(false);
  };



  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      tweet: input,
      userName: session?.user?.name || "userUndefined",
      profileImage:
        session?.user?.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XXUU7rwptQwyAt4c3rWgpDYdIhXZ0gusqSBiWLtfji7_fmRVU-KF&usqp=CAE&s",
      image: image,
      
    };

   

    const result = await fetch(`/api/addtwittes`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posted",{
      icon:<IoCheckmarkDoneSharp />
    });

   

    return json
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    postTweet();
    setInput('')
    setImage('')
    Router.push("/");
  };




  return (
    <div className="w-full flex items-center gap-[2rem]">
      <img
        src={
          session?.user?.image ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XXUU7rwptQwyAt4c3rWgpDYdIhXZ0gusqSBiWLtfji7_fmRVU-KF&usqp=CAE&s"
        }
        alt=""
        className="rounded-full w-[5rem] h-[5rem]"
      />

      <form className="flex flex-col gap-[1rem] py-[1rem] w-full">
        <input
          type="text"
          placeholder="What's happening?"
          className="outline-none bg-transparent border-b"
          value={input}
          onChange={handleInput}
        />
        <div className="flex items-center justify-between ">
          <div className="flex gap-[1rem]">
            <FaImage />
          </div>
          <button
            className="bg-blue-300 py-[0.3rem] rounded-sm text-[1rem] text-black disabled:cursor-not-allowed cursor-pointer"
            disabled={!input || !session}
            onClick={handleSubmit}>
            Tweet
          </button>
        </div>

      
          <form className="w-full flex items-center">
            <input
              type="text"
              className="w-full bg-transparent outline-none border border-blue-400 text-gray-500"
              placeholder="Enter image URL"
              ref={imageInputRef}
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white text-[0.825rem] rounded-sm p-1 whitespace-nowrap"
              onClick={addImageToTweet}
              type="submit">
              Add Image
            </button>
          </form>
      

        {image && <img src={image} alt="" className="max-w-lg rounded-lg" />}
      </form>
    </div>
  );
};

export default Index;
