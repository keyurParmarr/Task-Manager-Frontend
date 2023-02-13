import React, { createContext, useState } from "react";
export const UserContext = createContext({
  userdata: {},
  setUserdata: () => {},
  usertask: {},
  setUsertask: () => {},
});
export const Context = (props) => {
  const [userdata, setUserdata] = useState({});
  const [usertask, setUsertask] = useState([]);
  const value = { userdata, setUserdata, usertask, setUsertask };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
