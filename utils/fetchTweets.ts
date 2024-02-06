import { Tweet } from "@/typing";

export const fetchTweets= async()=>{

    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gettweets`)
    const data =await res.json();
    const tweets:Tweet[]=data.tweet;
    return tweets;
}