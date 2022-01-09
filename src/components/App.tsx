import { Route, Routes } from "react-router-dom";
import { Contexts } from "./Contexts";
import { Editor } from "./Editor";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { NoMatchFile } from "./NoMatchFile";
import { Settings } from "./Settings";

export const App: React.FC = () => {
  return (
    <Contexts>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="files">
            <Route path=":fileName" element={<Editor />} />
            <Route path="*" element={<NoMatchFile />} />
            <Route index element={<NoMatchFile />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </Contexts>
  );
};

const NoMatch: React.FC = () => {
  return <section>404 path not found</section>;
};
