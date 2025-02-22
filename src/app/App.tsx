import React, { FC, useState } from "react";
import { Login } from "../components/Login";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Search } from "../components/Search";

export const App: FC = () => {
  // const userStatus = useAppSelector((state) => state.user.status);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-base-200 min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-3 pt-3">
        <IconContext.Provider value={{ color: "#ff00d3" }}>
          <FaHeart className="icon self-end mb-2" size="32px" />
        </IconContext.Provider>
        <p className="text-7xl tracking-wider select-none">sheltr</p>
      </div>
      {showLogin ? (
        <Login closeModal={() => setShowLogin(false)} />
      ) : (
        <Search />
      )}
    </div>
  );
};
