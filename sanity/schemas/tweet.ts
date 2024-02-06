import { defineField, defineType } from "sanity";

export default defineType({
  name: "tweet",
  title: "Tweet",
  type: "document",
  fields: [
    defineField({
      name: "tweet",
      title: "tweet",
      type: "string",
    }),
    defineField({
      name: "blockTweet",
      title: "Block Tweet",
      description: "Admin controls: Toggle if tweet  is  need ! ",
      type: "boolean",
    }),
    defineField({
      name: "userName",
      title: "User Name",
      type: "string",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Tweet Image",
      type: "string",
    }),

    
 
  ],
});
