import React from "react";
import { createRoot } from "react-dom/client";

//Pages
import Landing from "./views/Landing.jsx";
import Upload from "./views/Upload.jsx";

//Global Context
import GlobalContext from "./GlobalContext.jsx";

//Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <GlobalContext>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/post" element={<Upload />} />
          </Routes>
        </BrowserRouter>
      </GlobalContext>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Main />);
