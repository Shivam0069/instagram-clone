import React from "react";
import { modalState } from '../pages/_app'
import { useRecoilState } from "recoil";
export default function UploadModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <div>
      <h1>UploadModal</h1>
      {isOpen && <h1>The Modal is Open</h1>}
    </div>
  );
}
