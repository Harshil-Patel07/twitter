import { client } from "@/sanity/lib/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";


export const userDetailsQuery=groq`
*[_type=="userDetails"] {
  ...
}
`

type Data = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

    const {userName}=req.query;

    console.log(req.query)

    const userDetails:any =await client.fetch(userDetailsQuery)
   
  res.status(200).json(userDetails);

  console.log(res)
}


