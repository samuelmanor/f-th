import React, { FC } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";

export const App: FC = () => {
  return (
    <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-3">
        <IconContext.Provider value={{ color: "#ff00d3" }}>
          <FaHeart className="icon self-end mb-2" size="32px" />
        </IconContext.Provider>
        <p className="text-7xl tracking-wider">shltr</p>
      </div>
      <Login />
    </div>
  );
};
