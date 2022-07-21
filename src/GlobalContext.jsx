import React, { useState, useEffect } from "react";

export const ConfigContext = React.createContext();

const GlobalContext = (props) => {
  return (
    <ConfigContext.Provider value={{}}>{props.children}</ConfigContext.Provider>
  );
};

export default GlobalContext;
