import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BreedDropdown } from "./BreedDropdown";
import { FaSearch } from "react-icons/fa";
import { AgeDropdown } from "./AgeDropdown";
import { CityDropdown } from "./CityDropdown";
import { StateDropdown } from "./StateDropdown";
import { fetchDogs, getDogIds } from "../Dog/dogSlice";
import { DogCard } from "../Dog";

interface SearchProps {}

/**
 * Search component for filtering dog search results.
 * Includes dropdowns for breed, age, city, and state.
 */
export const Search: FC<SearchProps> = () => {
  const params = useAppSelector((state) => state.dogs.searchParams);
  const dogIds = useAppSelector((state) => state.dogs.currentIds);
  const currentDogs = useAppSelector((state) => state.dogs.currentDogs);

  const dispatch = useAppDispatch();

  /**
   * Dispatches the getDogs action with the current search parameters.
   */
  const handleSearch = () => {
    dispatch(getDogIds(params)).then(() => {
      dispatch(fetchDogs());
    });
  };

  // useEffect(() => {
  //   if (dogIds.length > 0) {
  //     dispatch(fetchDogs());
  //   }
  // });

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
        <div className="btn" onClick={handleSearch}>
          <FaSearch size="18px" />
        </div>
      </div>
      {/* <div onClick={() => console.log(dogIds)}>jdkashfsla</div> */}
      <div className="grid grid-cols-5 gap-4">
        {currentDogs.map((dog) => (
          <DogCard key={dog.id} {...dog} />
        ))}
      </div>
    </div>
  );
};
