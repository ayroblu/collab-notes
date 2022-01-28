import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Contexts } from "./Contexts";
import { EditorWithComments } from "./EditorWithComments";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { Settings } from "./Settings";

export const App: React.FC = () => (
  <RecoilRoot>
    <Contexts>
      <RouteGroup />
    </Contexts>
  </RecoilRoot>
);

const RouteGroup: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="files">
        <Route index element={<EditorWithComments />} />
      </Route>
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

const NoMatch: React.FC = () => <section>404 path not found</section>;
