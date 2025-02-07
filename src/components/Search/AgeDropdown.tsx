import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setAgeParams } from "./dogSlice";

export const AgeDropdown = () => {
  const [lowerBound, setLowerBound] = useState<number>(0);
  const [upperBound, setUpperBound] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handleLowerBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
  };

  const handleUpperBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
  };

  const clearInputs = () => {
    setLowerBound(0);
    setUpperBound(0);
    dispatch(setAgeParams(0, 0));
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Age
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content border gap-2 flex flex-col w-56 p-2"
      >
        <label className="input input-bordered input-sm flex items-center gap-2">
          from
          <input
            type="number"
            value={lowerBound}
            onChange={handleLowerBoundChange}
          />
        </label>
        <label className="input input-bordered input-sm flex items-center gap-2">
          to
          <input
            type="number"
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
