import React, { FC, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setCityParams } from "./dogSlice";

/**
 * Dropdown component for selecting city.
 */
export const CityDropdown: FC = () => {
  const [city, setCity] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    dispatch(setCityParams(e.target.value));
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        City
      </div>
      <ul tabIndex={0} className="dropdown-content border flex-col w-56 p-2">
        <p>Enter the name of a city:</p>
        <input
          type="text"
          className="input input-bordered w-full p-2"
          placeholder="Pawsville"
          onChange={handleChange}
        />
      </ul>
    </div>
  );
};
