import { Comment } from "@/typing"

export const fetchcomments=async(tweetId:string)=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getcomments?tweetId=${tweetId}`)
    const data =await res.json();
    const comments:Comment[]=data;
    return comments
}