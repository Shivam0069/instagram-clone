import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import { BookMarkIcon, CommentIcon, HeartIcon, SmileyIcon } from "./SvgIcons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function Post({ img, userImg, username, caption, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db, id]);
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

      {/* Comments ... */}
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll scrollbar-none">
          {comments.map((comment) => (
            <div className="flex items-center space-x-2 mb-2">
              <img className="h-7 rounded-full object-cover " src={comment.data().userImage} alt="user-image" />
              <p className="font-semibold ">{comment.data().username}</p>
              <p className="flex-1 truncate">{comment.data().comment}</p>
              <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
            </div>
          ))}
        </div>
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
