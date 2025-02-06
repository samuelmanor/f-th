import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { BreedDropdown } from "./BreedDropdown";
// import { getBreeds } from "./dogSlice";
// import { Dropdown } from "./Dropdown";

interface SearchProps {}

export const Search: FC<SearchProps> = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>search</p>
      {/* <Dropdown name="breeds" content={breeds} /> */}
      <BreedDropdown />
    </div>
  );
};
