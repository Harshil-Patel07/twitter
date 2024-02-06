import { Comment, CommentBody, Tweet, TweetBody } from "@/typing";
import React, { useEffect, useState } from "react";
import ReactTimeago from "react-timeago";
import { FcLike as Liked } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { RiUpload2Line } from "react-icons/ri";
import { FaDownload, FaExchangeAlt, FaUserAlt } from "react-icons/fa";
import { IoChatbubbleEllipses, IoCheckmarkDoneSharp } from "react-icons/io5";
import { fetchcomments } from "@/utils/fetchcomments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { deleteSanityDocument } from "../deleteSanityDocument";
import { fetchTweets } from "@/utils/fetchTweets";

interface Props {
  tweet: Tweet;
  index: number;
  handleRefresh: any;
}

const Index = ({ tweet, index, handleRefresh }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const fetchedComments: Comment[] = await fetchcomments(tweet._id);
    setComments(fetchedComments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const postComment = async () => {
    const commentInfo: CommentBody = {
      comment: input,
      userName: session?.user?.name || "User Undefined",
      profileImage:
        session?.user?.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XXUU7rwptQwyAt4c3rWgpDYdIhXZ0gusqSBiWLtfji7_fmRVU-KF&usqp=CAE&s",
      tweetId: tweet._id,
    };

    const result = await fetch(`/api/addcomments`, {
      body: JSON.stringify(commentInfo),
      method: "POST",
    });

    const json = await result.json();
    const newComments = await fetchcomments(tweet._id);
    setComments(newComments);

    toast("Comment Posted", {
      icon: <IoCheckmarkDoneSharp />,
    });

    return json;
  };

  const handleSubmitComment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (session) {
      await postComment();
    } else {
      toast("Please sign in first!", {
        icon: <FaUserAlt />,
      });
    }
    setInput("");
  };

  const handleDeletePost = async () => {
    await deleteSanityDocument(tweet._id);
  };

  const handleDownload = () => {
    // Create a new anchor element
    const link = document.createElement("a");
    link.href = tweet.image;
    link.download = "image.jpg";

    // Trigger the download by simulating a click on the anchor element
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div className="border-gray-100 border p-4 rounded-xl">
      <div className="flex gap-[1rem]">
        <img
          src={tweet?.profileImage}
          alt="profileImage"
          className="w-[3rem] h-[3rem] rounded-full"
        />

        <div className="flex items-center justify-between w-full">
          <div>
            <p>{tweet?.userName}</p>
            <p>@{tweet.userName.replace(/\s+/g, "").toLowerCase()}</p>
          </div>
          <div>
            {/* <ReactTimeago date={tweet._createdAt} className="text-gray-400" /> */}
          </div>
        </div>
      </div>
      <div>
        <p className="mt-[2rem] mb-[0.5rem]">{tweet.tweet}</p>

        {tweet.image && (
          <img
            src={tweet.image}
            alt="tweetImage"
            className="rounded-lg shadow-sm shadow-gray-500"
          />
        )}
      </div>
      <div className="flex gap-[0.5rem] py-[1rem] w-full justify-between items-center">
        {/* like button  */}
        <Liked className="bg-white text-black text-[1.5rem] p-[0.1rem] rounded-full" />

        {/* tweet download button  */}
        {tweet.image && (
          <FaDownload
            className="bg-white text-black text-[1.5rem] p-[0.1rem] rounded-full "
            onClick={handleDownload}
          />
        )}

        <FaExchangeAlt className="bg-white text-black text-[1.5rem] p-[0.1rem] rounded-full" />
        <p
          onClick={() => {
            handleDeletePost();
            handleRefresh();
          }}>
          Delete
        </p>

        <div
          className="flex items-center relative"
          onClick={() => setCommentBoxVisible(!commentBoxVisible)}>
          <IoChatbubbleEllipses className="bg-white text-black text-[1.5rem] p-[0.1rem] rounded-full" />
          <span className="bg-red-600 text-[white] w-[1rem] h-[1rem] flex items-center justify-center rounded-full text-[0.625rem] absolute top-[-30%] right-[-30%]">
            {comments?.length}
          </span>
        </div>
      </div>

      {/* comment box  */}

      {commentBoxVisible && (
        <>
          <form className="flex gap-[1rem] items-center justify-between">
            <input
              type="text"
              placeholder="write a comment here..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="text-white bg-transparent outline-none border-b-2 w-full"
            />

            <button
              disabled={!input}
              type="submit"
              onClick={handleSubmitComment}
              className="max-w-[4rem] bg-blue-500">
              Post
            </button>
          </form>

          {comments?.length > 0 &&
            comments.map((comment) => {
              return (
                <div
                  key={comment._id}
                  className="border-l-8 pl-4 border-gray-700 my-[1rem] flex flex-col justify-between w-full">
                  <div className="flex gap-[1rem]">
                    <img
                      src={comment.profileImage}
                      alt="profileImage"
                      className="h-7 w-7 rounded-full"
                    />
                    <div className="flex gap-[0.5rem]">
                      <p>{comment.userName}</p>
                      <p className="text-[0.825rem] text-gray-500">
                        @{comment.userName.replace(/\s+/g, "").toLowerCase()}
                      </p>
                      {/* <ReactTimeago
                        date={comment._createdAt}
                        className="text-[0.825rem] text-gray-500"
                      /> */}
                    </div>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Index;
