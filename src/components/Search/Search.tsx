import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BreedDropdown } from "./BreedDropdown";
import { FaSearch } from "react-icons/fa";
import { AgeDropdown } from "./AgeDropdown";
import { CityDropdown } from "./CityDropdown";
import { StateDropdown } from "./StateDropdown";

interface SearchProps {}

export const Search: FC<SearchProps> = () => {
  const params = useAppSelector((state) => state.dogs.searchParams);

  return (
    <div>
      <div className="flex items-center gap-4">
        <p>search by:</p>
        <div className="flex flex-nowrap">
          <BreedDropdown />
          <AgeDropdown />
          <CityDropdown />
          <StateDropdown />
        </div>
        <div className="btn">
          <FaSearch size="18px" />
        </div>
      </div>
      <div onClick={() => console.log(params)}>jdkashfsla</div>
    </div>
  );
};
