import Image from "next/legacy/image";
import React, { useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState, userState } from "../pages/_app";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function Header() {
  // const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(db, "users", user.auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
            console.log(currentUser);
          }
        };
        fetchUser();
      }
    });
  }, []);
  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }

  return (
    <div className="sticky top-0  bg-white shadow-sm border-b z-30">
      <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
        {/* Left */}
        <div className="cursor-pointer h-24 w-24 relative hidden lg:inline-grid">
          <Image
            onClick={() => router.push("/")}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMaJr0B21N0SLLrMF7rpIEc51oXfIxOTe4ZQ&usqp=CAU"
            layout="fill"
            className="object-contain"
          />
        </div>
        <div className="cursor-pointer h-24 w-10 relative lg:hidden ">
          <Image
            onClick={() => router.push("/")}
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
            layout="fill"
            className="object-contain"
          />
        </div>
        {/* Middle */}
        <div className="relative mt-1">
          <div className="absolute top-2 left-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              data-slot="icon"
              className="h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            placeholder="Search"
            type="text"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          />
        </div>

        {/* Right */}

        <div className="flex space-x-4 items-center">
          <svg
            onClick={() => router.push("/")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            data-slot="icon"
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
          >
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
          </svg>
          {currentUser ? (
            <>
              <svg
                onClick={() => setIsOpen((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                data-slot="icon"
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <img
                onClick={onSignOut}
                src={currentUser?.userImg}
                alt="user-image"
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button onClick={() => router.push("/auth/signin")}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
