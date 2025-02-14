import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchDogs } from "../Dog/dogSlice";

/**
 * Pagination component for navigating through pages of dog results.
 */
export const Pagination: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const dogIds = useAppSelector((state) => state.dogs.currentIds);
  const params = useAppSelector((state) => state.dogs.searchParams);
  const searchInfo = useAppSelector((state) => state.dogs.searchInfo);

  const dispatch = useAppDispatch();

  /**
   * Dispatches the fetchDogs action with the current search parameters and scrolls to the top.
   */
  const handleNextPage = () => {
    dispatch(
      fetchDogs({ ...params, pagination: searchInfo.nextPage || undefined })
    );

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 500);
  };

  /**
   * Dispatches the fetchDogs action with the current search parameters and scrolls to the top.
   */
  const handlePrevPage = () => {
    dispatch(
      fetchDogs({ ...params, pagination: searchInfo.prevPage || undefined })
    );

    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 500);
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
    <>
      <div className="flex justify-center py-4">
        <div className="join gap-6">
          <button
            className="join-item btn btn-md"
            disabled={currentPage * 25 === 25}
            onClick={handlePrevPage}
          >
            «
          </button>
          <button className="join-item cursor-default">{currentPage}</button>
          <button
            className="join-item btn btn-md"
            disabled={
              searchInfo.total ? currentPage * 25 >= searchInfo.total : true
            }
            onClick={handleNextPage}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};
