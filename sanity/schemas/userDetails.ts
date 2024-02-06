import { defineField } from "sanity";

export default{
    name:"userDetails",
    title:"User Details",
    type:"document",
    fields:[
        defineField({
            name: "userName",
            title: "User Name",
            type: "string"
            
          
          }),
         
          defineField({
            name: "profileBgImg",
            title: "Profile background Image",
            type: "string",
          }),
          defineField({
            name:"bio",
            title:"Bio",
            type:"text"
          }),
       
          defineField({
            name: 'otherLinks',
            title: 'Other Links',
            type: 'array',
            of:[
              {
                title:"label",
                name:"label",
                type:"string"
              },
              {
                name:"link",
                title:"link",
                type:"url"
              }
            ],
          }),

    ]
}