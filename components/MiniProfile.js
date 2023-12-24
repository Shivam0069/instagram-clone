import React from "react";

export default function MiniProfile() {
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src="https://media.licdn.com/dms/image/D4D03AQERLA-5EsZKtw/profile-displayphoto-shrink_800_800/0/1670099195064?e=2147483647&v=beta&t=FRqOsFvEcUnktAVAVT5dAleiDYp7yvO1-S6c6aYNs1I"
        alt="user-image"
        className="h-16 rounded-full border p-[2px] "
      />
      <div className="flex-1 ml-4">
        <h2 className="font-bold">Shivam Singh</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>
      <button className="font-semibold text-blue-400 text-sm">Sign out</button>
    </div>
  );
}
