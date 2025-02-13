import React, { FC, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setStateParams } from "../Dog/dogSlice";

/**
 * Dropdown component for selecting state.
 */
export const StateDropdown: FC = () => {
  const [states, setStates] = useState("");

  const dispatch = useAppDispatch();

  /**
   * Handles the change event for the state input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStates(e.target.value);

    dispatch(setStateParams(e.target.value));
  };

  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          State
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content rounded-box border flex-col w-56 p-2"
        >
          <p>Enter abbreviated form of state(s), separated by a comma:</p>
          <input
            type="text"
            className="input input-bordered w-full p-2"
            placeholder="ex. MI, WI, IL"
            onChange={handleChange}
          />
        </ul>
      </div>
    </div>
  );
};
