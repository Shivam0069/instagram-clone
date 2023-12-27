import React from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { userState } from "@/pages/_app";
import { getAuth , signOut } from "firebase/auth";
export default function MiniProfile() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const auth = getAuth();
  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  // const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={currentUser?.userImg}
        alt="user-image"
        className="h-16 rounded-full border p-[2px] "
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">{currentUser?.username}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button
        className="font-semibold text-blue-400 text-sm"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
