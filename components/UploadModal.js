import React from "react";
import { modalState } from '../pages/_app'
import { useRecoilState } from "recoil";
import Modal from 'react-modal'
export default function UploadModal() {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <div>
     
      {isOpen && (
        <Modal className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md" isOpen={isOpen} onRequestClose={()=>setIsOpen(false)}>
            <div className="flex flex-col justify-center items-center">

            <h1>Modal</h1>
            </div>
        </Modal>
      )}
    </div>
  );
}

