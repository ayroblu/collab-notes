import React from "react";
import { Route, Routes } from "react-router-dom";

import { Contexts, SettingsContext } from "./Contexts";
import { Editor } from "./Editor";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { Onboarding } from "./Onboarding";
import { Settings } from "./Settings";

export const App: React.FC = () => {
  return (
    <Contexts>
      <RouteGroup />
    </Contexts>
  );
};

const RouteGroup: React.FC = () => {
  const { settings } = React.useContext(SettingsContext);
  if (settings.rooms.length) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="files">
            <Route index element={<Editor />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    );
  } else {
    return <Onboarding />;
  }
};

const NoMatch: React.FC = () => {
  return <section>404 path not found</section>;
};
