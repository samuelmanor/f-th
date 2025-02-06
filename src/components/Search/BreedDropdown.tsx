import React, { FC, useEffect, useState } from "react";
import { getBreeds } from "./dogSlice";
import { useAppDispatch } from "../../app/hooks";

interface BreedDropdownProps {
  // name: string;
  // content: string[];
}

export const BreedDropdown: FC<BreedDropdownProps> = ({}) => {
  const [search, setSearch] = useState("");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [displayedContent, setDisplayedContent] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBreeds()).then((action) => {
      if (getBreeds.fulfilled.match(action)) {
        console.log(action.payload);
        setBreeds(action.payload);
        setDisplayedContent(action.payload);
      }
    });
  }, []);

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn m-1">
        Breeds
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu border flex-col gap-2 max-h-44 w-56 overflow-y-scroll overflow-x-hidden flex-nowrap"
      >
        <input
          type="text"
          className="input input-bordered w-full p-2"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
            setDisplayedContent(
              breeds.filter((breed) =>
                breed.toLowerCase().includes(e.target.value.toLowerCase())
              )
            );
          }}
        />
        {displayedContent.map((item, i) => (
          <div key={i} className="flex flex-nowrap gap-1">
            <label className="label cursor-pointer">
              <input type="checkbox" className="checkbox" />
              <span className="label-text pl-2">{item}</span>
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
