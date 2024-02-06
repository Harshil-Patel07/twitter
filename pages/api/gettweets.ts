import { client } from "@/sanity/lib/client";
import { Tweet } from "@/typing";
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";

 export const FeedQuery = groq`
*[_type=="tweet" && !blockTweet  ]| order(_createdAt desc){
    _id,
  ...
} `;

type Data = {
    tweet: Tweet[];
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const tweet:Tweet[] = await client.fetch(FeedQuery)
  res?.status(200).json({tweet});
}
