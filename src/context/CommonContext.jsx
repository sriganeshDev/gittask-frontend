

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CommonContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userReadMe, setUserReadMe] = useState();
  const [userFollowerList, setUserFollowerList] = useState([]);

  const [userRepos, setUserRepos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <CommonContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        userReadMe,
        setUserReadMe,
        setUserFollowerList,
        userFollowerList,

        userRepos,
        setUserRepos,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export const useCommonContext = () => useContext(CommonContext);
