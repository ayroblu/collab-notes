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
    <Route path="/" element={<Layout />}>
      <Route index element={<RoomRedirect />} />
      <Route path="/:roomId">
        <Route index element={<Navigate to="files" replace />} />
        <Route path="files">
          <Route index element={<EditorWithComments />} />
        </Route>
        <Route path="*" element={<Navigate to="files" replace />} />
      </Route>
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

const NoMatch: React.FC = () => <section>404 path not found</section>;
