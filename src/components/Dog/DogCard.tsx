import React, { FC, useRef } from "react";
import { Dog } from "./dogSlice";
import { FaRegHeart } from "react-icons/fa";
import { IconContext } from "react-icons";

export const DogCard: FC<Dog> = (dog) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const handleSave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    console.log("saved!");
  };

  return (
    <>
      <div
        onClick={openModal}
        className={`card bg-base-100 hover:shadow-xl rounded-box p-2 cursor-pointer`}
      >
        <img
          src={dog.img}
          alt={dog.name}
          className="object-cover h-64 w-64 rounded-box"
        />
        <div className="flex p-2 items-center gap-2">
          <div onClick={handleSave} className="z-10">
            <IconContext.Provider value={{ color: "#ff00d3" }}>
              <FaRegHeart className="icon" size={"18px"} />
            </IconContext.Provider>
          </div>
          <p className="text-xl font-bold">{dog.name}</p>
        </div>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box z-20">
          <h3 className="font-bold text-lg">{dog.name}</h3>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={closeModal}>
              close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
