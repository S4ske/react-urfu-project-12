import { Route, Routes } from "react-router";

import PrivateRoute from "./components/PrivateRoute.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { appRoutes } from "./routes.js";

const App = () => (
  <Routes>
    <Route
      path={appRoutes.root()}
      element={(
        <PrivateRoute>
          <ChatPage />
        </PrivateRoute>
      )}
    />
    <Route path={appRoutes.login()} element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
