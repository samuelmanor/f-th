import React, { FC, useState } from "react";

export const CityDropdown: FC = () => {
  const [city, setCity] = useState<string>("");
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
          onChange={(e) => setCity(e.target.value)}
        />
      </ul>
    </div>
  );
};
