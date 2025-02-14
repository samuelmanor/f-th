import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BreedDropdown } from "./BreedDropdown";
import { FaSearch } from "react-icons/fa";
import { AgeDropdown } from "./AgeDropdown";
import { CityDropdown } from "./CityDropdown";
import { StateDropdown } from "./StateDropdown";
import { fetchDogs } from "../Dog/dogSlice";
import { DogCard } from "../Dog";
import { Pagination } from "./Pagination";

interface SearchProps {}

/**
 * Search component for filtering dog search results.
 * Includes dropdowns for breed, age, city, and state.
 */
export const Search: FC<SearchProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const params = useAppSelector((state) => state.dogs.searchParams);
  const dogIds = useAppSelector((state) => state.dogs.currentIds);
  const currentDogs = useAppSelector((state) => state.dogs.currentDogs);
  const searchInfo = useAppSelector((state) => state.dogs.searchInfo);
  const searchStatus = useAppSelector((state) => state.dogs.status);

  const dispatch = useAppDispatch();

  /**
   * Dispatches the getDogs action with the current search parameters.
   */
  const handleSearch = () => {
    dispatch(fetchDogs(params));
  };

  const handleNextPage = () => {
    dispatch(
      fetchDogs({ ...params, pagination: searchInfo.nextPage || undefined })
    );

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 10);
  };

  const handlePrevPage = () => {
    dispatch(
      fetchDogs({ ...params, pagination: searchInfo.prevPage || undefined })
    );

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 10);
  };

  useEffect(() => {
    if (searchInfo.total) {
      const from = new URLSearchParams(searchInfo.nextPage || "").get("from");
      if (from) {
        setCurrentPage(Number(from) / 25);
      }
    }
  }, [dogIds]);

  return (
    <div>
      <div className="flex items-center gap-4 justify-center py-2">
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
      {searchStatus === "loading" ? (
        <div className="flex justify-center py-2">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : null}
      {currentDogs.length > 0 ? (
        <>
          <div className="">
            <p>{searchInfo.total} results</p>
            <div className="grid grid-cols-5 gap-4 grid-rows-5">
              {currentDogs.map((dog) => (
                <DogCard key={dog.id} {...dog} />
              ))}
            </div>
          </div>
          <Pagination />
        </>
      ) : null}
    </div>
  );
};
