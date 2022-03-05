import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Contexts } from "./Contexts";
import { EditorWithComments } from "./EditorWithComments";
import { Layout } from "./Layout";
import { RoomRedirect } from "./RoomRedirect";
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
    <Route element={<Layout />} path="/">
      <Route element={<RoomRedirect />} index />
      <Route path="/:roomId">
        <Route element={<Navigate replace to="files" />} index />
        <Route path="files">
          <Route element={<EditorWithComments />} index />
        </Route>
        <Route element={<Navigate replace to="files" />} path="*" />
      </Route>
      <Route element={<Settings />} path="settings" />
      <Route element={<NoMatch />} path="*" />
    </Route>
  </Routes>
);

const NoMatch: React.FC = () => <section>404 path not found</section>;
