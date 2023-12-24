import React from "react";
import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: "1",
      username: "Shivam",
      userImg:
        "https://media.licdn.com/dms/image/D4D03AQERLA-5EsZKtw/profile-displayphoto-shrink_800_800/0/1670099195064?e=2147483647&v=beta&t=FRqOsFvEcUnktAVAVT5dAleiDYp7yvO1-S6c6aYNs1I",
      img: "https://images.unsplash.com/photo-1682687221175-fd40bbafe6ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Nice Picture",
    },
    {
      id: "2",
      username: "Shivam__",
      userImg:
        "https://media.licdn.com/dms/image/D4D03AQERLA-5EsZKtw/profile-displayphoto-shrink_800_800/0/1670099195064?e=2147483647&v=beta&t=FRqOsFvEcUnktAVAVT5dAleiDYp7yvO1-S6c6aYNs1I",
      img: "https://images.unsplash.com/photo-1683009427042-e094996f9780?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "New Picture",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          img={post.img}
          userImg={post.userImg}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
