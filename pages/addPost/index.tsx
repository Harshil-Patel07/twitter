import React, { useState } from 'react'
import TwitteBox from '../../components/TwitteBox'
import { Tweet } from '@/typing';
import toast from 'react-hot-toast';
import { fetchTweets } from '@/utils/fetchTweets';
interface Props {
    tweets: Tweet[];
  }
  
const addPost = ({ tweets: tweetsProp }: Props) => {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
   
  
  return (
    <div>
      <TwitteBox setTweets={setTweets} />
    </div>
  )
}

export default addPost