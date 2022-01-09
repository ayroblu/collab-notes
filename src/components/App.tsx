import { Outlet, Route, Routes } from "react-router-dom";
import { Editor } from "./Editor";
import { NavBar } from "./NavBar";
import { Settings } from "./Settings";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RootHandler />} />
        <Route path="files">
          <Route path=":fileId" element={<Editor />} />
          <Route path="*" element={<NoMatchFile />} />
          <Route index element={<NoMatchFile />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const NoMatch: React.FC = () => {
  return <section>404 path not found</section>;
};
const NoMatchFile: React.FC = () => {
  return <section>File not found</section>;
};
const RootHandler: React.FC = () => {
  return (
    <section>
      <h1>Welcome to Collab Notes</h1>
      <p>
        This is decentralised way of keeping notes, none of your notes data is
        stored on our servers (this doesn't have any servers)
      </p>
      <p>Enter your nickname</p>
      <p>Enter your room id:</p>
      <p>create a new room</p>
      <p>Editor settings</p>
    </section>
  );
};
