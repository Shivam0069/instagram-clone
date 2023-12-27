"use client";
import React, { useEffect, useState } from "react";
import minifaker from "minifaker";
import "minifaker/locales/en";
import Story from "./Story";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userState } from "@/pages/_app";
export default function Stories() {
  // const { data: session } = useSession();
  const [storyUsers, setStoryUsers] = useState([]);
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`,
      id: i,
    }));
    setStoryUsers(storyUsers);
  }, []);
  return (
    <div className="flex space-x-2 p-6 bg-white mt-8  border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none">
      {currentUser && (
        <Story
          img={currentUser?.userImg}
          username={currentUser?.username}
          isUser="true"
        />
      )}
      {storyUsers.map((user) => (
        <Story key={user.id} username={user.username} img={user.img} />
      ))}
    </div>
  );
}
