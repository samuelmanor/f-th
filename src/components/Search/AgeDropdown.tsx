import React, { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setAgeParams } from "../Dog/dogSlice";

/**
 * Dropdown component for selecting age range.
 */
export const AgeDropdown = () => {
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(0);

  const selectedAges = useAppSelector((state) => state.dogs.searchParams);

  const dispatch = useAppDispatch();

  /**
   * Only allows numbers in the input
   */
  const validateInput = (value: string) => value.replace(/[^0-9]/g, "");

  const handleLowerBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(validateInput(e.target.value));
    setLowerBound(value);

    if (value !== lowerBound) {
      dispatch(setAgeParams(value, upperBound));
    }
  };

  const handleUpperBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(validateInput(e.target.value));
    setUpperBound(value);

    if (value !== upperBound) {
      dispatch(setAgeParams(lowerBound, value));
    }
  };

  const clearInputs = () => {
    setLowerBound(0);
    setUpperBound(0);
    dispatch(setAgeParams(0, 0));
  };

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className={`btn m-1 ${
          selectedAges.ageMin || selectedAges.ageMax ? "btn-secondary" : ""
        }`}
      >
        Age
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content rounded-box border gap-2 flex flex-col w-56 p-2 z-10 bg-base-200"
      >
        <label className="input input-bordered input-sm flex items-center gap-2">
          from
          <input
            type="text"
            value={lowerBound}
            onChange={handleLowerBoundChange}
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2">
          to
          <input
            type="text"
            value={upperBound}
            onChange={handleUpperBoundChange}
          />
        </label>
        <div className="btn btn-sm" onClick={clearInputs}>
          clear
        </div>
      </ul>
    </div>
  );
};
