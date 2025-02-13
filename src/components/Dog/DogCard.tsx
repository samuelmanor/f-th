import React, { FC } from "react";
import { Dog } from "./dogSlice";

export const DogCard: FC<Dog> = (dog) => {
  return (
    <div
      onClick={() => console.log(dog)}
      className="card w-40 bg-base-100 shadow-xl rounded-box p-2"
    >
      <img src={dog.img} alt={dog.name} />
      <p>
        {dog.name} <span>{dog.age}</span>
      </p>
      <p>{dog.breed}</p>
      {/* <p>{dog.age}</p> */}
      {/* <p>{dog.city}</p>
    <p>{dog.state}</p> */}
    </div>
  );
};
