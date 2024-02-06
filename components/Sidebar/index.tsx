import React from "react";
import SidebarRow from "../SidebarRow";
import { signIn, signOut, useSession } from "next-auth/react";

const index = () => {
  const { data: session } = useSession();

  return (
    <div className=" border-r px-[2rem]    ">
      <h1 className=" bg-blue-500 w-fit p-4 rounded-full cursor-pointer">
        Twitter
      </h1>
      <header className="flex flex-col gap-[2rem] px-[1rem] py-[4rem] ">
        <SidebarRow title="Home" linkToNavigate="/" />
        <SidebarRow title="profile" linkToNavigate="/profile" />
        <SidebarRow title="saved Tweet" linkToNavigate="/profile" />
        <SidebarRow title="Add Tweet" linkToNavigate="/addPost"/>

        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </header>
    </div>
  );
};

export default index;
