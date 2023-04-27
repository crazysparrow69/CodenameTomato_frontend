import React from "react";

const AppContext = React.createContext({
  isLoggedIn: false,
  userData: {},
  tasks: [],
  avatar: null
});

export default AppContext;