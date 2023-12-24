import React from "react";

export default function Story({ img, username }) {
  return (
    <div className="relative group cursor-pointer">
      <img className="rounded-full h-14 p-[1.5px] border-red-500 border-2 hover:scale-110 transition-transform duration-200 ease-out" src={img} alt={username} />
      <p className="text-xs w-14 truncate">{username}</p>
    </div>
  );
}
