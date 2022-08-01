import React from "react";
import { createRoot } from "react-dom/client";

//Pages
import Feed from "./views/Feed.jsx";
import Upload from "./views/Upload.jsx";
import LoginAndSignUp from "./views/LoginAndSignUp.jsx";
import TempNav from "./views/TempNav.jsx";

//Global Context
import GlobalContext from "./GlobalContext.jsx";

//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Main = () => {
  return (
    <>
      <GlobalContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TempNav />} />
            <Route exact path="/enter" element={<LoginAndSignUp />} />
            <Route exact path="/feed" element={<Feed />} />
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