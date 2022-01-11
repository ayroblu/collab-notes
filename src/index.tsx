import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { register } from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

register({
  // Reload the page on new service worker discovered
  // https://github.com/facebook/create-react-app/issues/5316#issuecomment-532776796
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    interface ServiceWorkerEvent extends Event {
      target: (Partial<ServiceWorker> & EventTarget) | null;
    }

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener(
        "statechange",
        (event: ServiceWorkerEvent) => {
          if (event.target && event.target.state === "activated") {
            window.location.reload();
          }
        }
      );
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
reportWebVitals();
