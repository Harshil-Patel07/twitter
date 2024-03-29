import { TweetBody } from "@/typing";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

const data:TweetBody=JSON.parse(req.body)

const mutations= {
    mutations:[
        {
            create:{
                _type:'tweet',
                tweet:data.tweet,
                userName:data.userName,
                blockTweet:false,
                profileImage:data.profileImage,
                image:data.image,
            },
        

        }
    ]
}

const apiEndpoint=`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

const result= await fetch(apiEndpoint,{
    headers:{
        'content-type':'application/json',
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY}` 
    },
    body:JSON.stringify(mutations),
    method:'POST'
})

const json=await result.json()

  res.status(200).json({ message: "Added!" });
}
