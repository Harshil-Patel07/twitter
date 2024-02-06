
export type TweetBody = {
  tweet: string
  userName: string
  profileImage: string
  image: string
  
};

export interface Tweet extends TweetBody{
  _id:string
  _createdAt:string
  _updatedAt:string
  _rev:string
  _type:'tweet'
  blockTweet:boolean
}


export type CommentBody = {
  comment: string
  tweetId: string
  userName: string
  profileImage: string
};

export interface Comment extends CommentBody{
  _id:string
  _createdAt:string
  _updatedAt:string
  _rev:string
  _type:'tweet'
  tweet:{
    _ref:string
    _type:"reference"
  }
}

export type ProfileDetailsBody={
  profilebgImg:string
  userName:string | null |undefined
  biotext:string
  otherLinks:{
    label:string
    link:url
  }[]
}

export interface ProfileDetails extends ProfileDetailsBody{
  biotext: any;
  _id:string
  _createdAt:string
  _updatedAt:string
  _rev:string
  _type:'userDetails'
}