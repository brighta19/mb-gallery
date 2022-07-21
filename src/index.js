import React from "react";
import { createRoot } from "react-dom/client";

//Pages
import Landing from "./views/Landing.jsx";

//Global Context
import GlobalContext from "./GlobalContext.jsx";

const Main = () => {
  return (
    <>
      <GlobalContext>
        <Landing />
      </GlobalContext>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
