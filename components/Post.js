import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { BookMarkIcon, CommentIcon, HeartIcon, SmileyIcon } from "./SvgIcons";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function Post({ img, userImg, username, caption, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  async function sendComment(e) {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  }
  return (
    <div className="bg-white my-7 border rounded-md">
      {/* Post Header */}
      <div className="flex items-center p-5 ">
        <img
          src={userImg}
          alt={username}
          className="h-12 rounded-full object-cover p-1 border mr-3"
        />
        <p className="font-bold flex-1">{username}</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>

      {/* Post Img */}
      <img src={img} alt={caption} className="object-cover w-full" />

      {/* Post Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            {HeartIcon}
            {CommentIcon}
          </div>
          {BookMarkIcon}
        </div>
      )}

      {/* Post Comments */}
      {caption.length > 0 && (
        <p className="p-5 truncate ">
          <span className="font-bold mr-2">{username}</span>
          {caption}
        </p>
      )}

      {/* Post Input Box */}
      {session && (
        <form className="flex items-center p-4" onSubmit={sendComment}>
          {SmileyIcon}
          <input
            className="flex-1 border-none focus:ring-0"
            type="text"
            placeholder="Enter Your Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment.trim()}
            className="text-blue-400 font-bold disabled:text-gray-500 disabled:cursor-not-allowed
        "
          >
            POST
          </button>
        </form>
      )}
    </div>
  );
}
