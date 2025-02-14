import React, { FC } from "react";
import { Dog } from "./dogSlice";

export const DogCard: FC<Dog> = (dog) => {
  return (
    <div
      onClick={() => console.log(dog)}
      className="card w-40 bg-base-100 hover:shadow-xl rounded-box p-2 cursor-pointer"
    >
      <img src={dog.img} alt={dog.name} />
      <p>
        {dog.name} <span>{dog.age}</span>
      </p>
      <p>{dog.breed}</p>
      <p>{dog.zip_code}</p>
    </div>
  );
};
