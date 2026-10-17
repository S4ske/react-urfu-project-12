import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";

import init from "./init.jsx";
import { errorHandler, initSentry } from "./sentry.js";

const app = async () => {
  initSentry();
  const root = ReactDOM.createRoot(document.querySelector("#root"), {
    onUncaughtError: errorHandler,
    onRecoverableError: errorHandler,
  });
  const socket = io();
  root.render(await init(socket));
};

app();
