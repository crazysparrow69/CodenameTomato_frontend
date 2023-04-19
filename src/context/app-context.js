import React from "react";

const AppContext = React.createContext({
  isLoggedIn: false,
  userData: {},
  tasks: []
});

export default AppContext;