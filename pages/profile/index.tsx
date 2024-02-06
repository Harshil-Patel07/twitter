
import { deleteSanityDocument } from "@/components/deleteSanityDocument";
import { client } from "@/sanity/lib/client";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

interface OtherLinks {
  value: string;
}

interface FormData {
  profilebgImg: string;
  otherLinks: OtherLinks[];
  bio: string | null;
}

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [biotext, setBioText] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    profilebgImg: "",
    otherLinks: [{ value: "" }],
    bio: biotext
  });
  console.log(formData);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOtherLinksChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newOtherLinks = [...formData.otherLinks];
    newOtherLinks[index].value = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      otherLinks: newOtherLinks,
    }));
  };

  const handleAddField = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      otherLinks: [...prevFormData.otherLinks, { value: "" }],
    }));
  };

  const handleRemoveField = (index: number) => {
    const newOtherLinks = [...formData.otherLinks];
    newOtherLinks.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      otherLinks: newOtherLinks,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Construct data object to send to Sanity schema
    const ProfileDetailsInfo = {
      profilebgImg: formData.profilebgImg,
      otherLinks: formData.otherLinks.map((link) => link.value),
      biotext,
      userName: session?.user?.name || "Harshil Agola",
    };

    console.log(ProfileDetailsInfo);

    // Send data to Sanity schema
    try {
      const result = await fetch(`/api/addProfileDetails`, {
        method: "POST",
        body: JSON.stringify(ProfileDetailsInfo),
      });
      const json = await result.json();
      console.log(json);
      toast("Profile Updated", {
        icon: <IoCheckmarkDoneSharp />,
      });
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      toast.error("Error updating profile");
    }
  };
  console.log(session);


  return (
    <div>



      {!session ? (
        <>
          {/* <ProfileDetails userName={session?.user?.name} /> */}
          <form className="text-white  " onSubmit={handleSubmit}>
            <div>
              {/* Profile Background Image */}
              Profile Background Image
              <input
                type="text"
                name="profilebgImg"
                value={formData.profilebgImg}
                onChange={handleChange}
                className="text-black"
              />
            </div>
            <div>
              <textarea
                className="text-black"
                placeholder="Please add the bio"
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setBioText(event?.target.value);
                }}></textarea>
            </div>
            <div>
              {/* Other Links */}
              {formData.otherLinks.map((link, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="Enter link"
                    value={link.value}
                    onChange={(event) => handleOtherLinksChange(index, event)}
                    className="text-black"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddField}>
                Add Link
              </button>
            </div>
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>please sign in</>
      )}
    </div>
  );
};

export default Profile;
