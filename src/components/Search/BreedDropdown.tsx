import React, { FC, useEffect, useState } from "react";
import { getBreeds, setBreedParams } from "./dogSlice";
import { useAppDispatch } from "../../app/hooks";

/**
 * Dropdown component for selecting dog breeds.
 */
export const BreedDropdown: FC = () => {
  const [search, setSearch] = useState("");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [displayedContent, setDisplayedContent] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBreeds()).then((action) => {
      if (getBreeds.fulfilled.match(action)) {
        setBreeds(action.payload);
        setDisplayedContent(action.payload);
      }
    });
  }, []);

  return (
    <div className="dropdown dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Breed
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
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => dispatch(setBreedParams(item))}
              />
              <span className="label-text pl-2">{item}</span>
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};
