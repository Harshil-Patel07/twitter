import { client } from "@/sanity/lib/client";
import { Comment } from "@/typing";
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";


export const CommentQuery=groq`
*[_type=="comment" && references(*[_type=="tweet" &&  _id==$tweetId]._id)]{
  ...
} | order(_createdAt desc)
`

type Data = Comment[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    const {tweetId}=req.query;

    const comments:Comment[] =await client.fetch(CommentQuery,{
        tweetId:tweetId
    })
   
  res.status(200).json(comments);
}
