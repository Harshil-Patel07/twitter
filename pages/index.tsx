import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/widgets";
import { GetServerSideProps } from "next";
import { fetchTweets } from "@/utils/fetchTweets";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { useEffect } from "react";
import { Tweet } from "@/typing";
import { Toaster } from "react-hot-toast";

interface Props{
  tweets:Tweet[]
}

export default  function Home({tweets}:Props) {


  return (
    <main className="flex ">
      <Toaster/>
     
      <section className="w-[60vw] h-[100vh]">
        <Feed tweets={tweets} />
      </section>

      <section className=" w-[20vw] h-[100vh]">
        <Widgets />
      </section>
    </main>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const tweets =await fetchTweets()
    return {
      props: {tweets }
    };
  
};
