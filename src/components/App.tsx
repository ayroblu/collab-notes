import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Contexts } from "./Contexts";
import { EditorWithComments } from "./EditorWithComments";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { Settings } from "./Settings";
import { ErrorBoundary } from "./shared/ErrorBoundary";
import { Spinner } from "./shared/Spinner";

export const App: React.FC = () => (
  <RecoilRoot>
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Contexts>
          <RouteGroup />
        </Contexts>
      </Suspense>
    </ErrorBoundary>
  </RecoilRoot>
);

const RouteGroup: React.FC = () => (
  <Routes>
    <Route path="/:roomId" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="files">
        <Route index element={<EditorWithComments />} />
      </Route>
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
    <Route path="*" element={<NoMatch />} />
  </Routes>
);

const NoMatch: React.FC = () => <section>404 path not found</section>;
