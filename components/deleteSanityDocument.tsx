import toast from "react-hot-toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

 export const deleteSanityDocument = async (documentID: string) => {
  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            delete: {
              id: documentID,
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete document in Sanity");
    }

 

    const data = await response.json();
    toast("Tweed Deleted Successfully", {
      icon: <IoCheckmarkDoneSharp />,
    });
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};



// import toast from "react-hot-toast";
// import { IoCheckmarkDoneSharp } from "react-icons/io5";

// export const deleteSanityDocument = async (documentID: string) => {
//   const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

//   try {
//     // Fetch the parent document
//     const parentResponse = await fetch(
//       `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/doc/${documentID}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY}`,
//         },
//       }
//     );

//     if (!parentResponse.ok) {
//       throw new Error("Failed to fetch parent document from Sanity");
//     }

//     const parentData = await parentResponse.json();

//     // Delete child documents associated with the parent
//     const childDocuments = parentData._type === "parentType" ? parentData.children : [];
//     const deleteChildPromises = childDocuments.map(async (childDocument: any) => {
//       const childID = childDocument._id;
//       const childResponse = await fetch(apiEndpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY}`,
//         },
//         body: JSON.stringify({
//           mutations: [
//             {
//               delete: {
//                 id: childID,
//               },
//             },
//           ],
//         }),
//       });

//       if (!childResponse.ok) {
//         throw new Error("Failed to delete child document in Sanity");
//       }
//     });

//     // Wait for all child documents to be deleted
//     await Promise.all(deleteChildPromises);

//     // Delete the parent document
//     const response = await fetch(apiEndpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN_KEY}`,
//       },
//       body: JSON.stringify({
//         mutations: [
//           {
//             delete: {
//               id: documentID,
//             },
//           },
//         ],
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to delete document in Sanity");
//     }

//     toast("Tweet Deleted Successfully", {
//       icon: <IoCheckmarkDoneSharp />,
//     });
//   } catch (error) {
//     console.error("Error deleting document:", error);
//     toast.error("Error deleting document");
//   }
// };
