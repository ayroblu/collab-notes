import React from "react";
import { Editor } from "./Editor";
import { NavBar } from "./NavBar";

export const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Editor />
    </>
  );
};
