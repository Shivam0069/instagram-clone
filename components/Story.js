import React from "react";

export default function Story({ img, username, isUser }) {
  return (
    <div className="relative group cursor-pointer">
      <img
        className="rounded-full h-14 p-[1.5px] border-red-500 border-2 group-hover:scale-110 transition-transform duration-200 ease-out"
        src={img}
        alt={username}
      />
      {isUser && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white h-6 absolute top-4 left-4"
        >
          <path
            fill-rule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"
          />
        </svg>
      )}
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}
