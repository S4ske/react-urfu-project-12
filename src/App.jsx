import { Route, Routes } from "react-router";

import Layout from "./components/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { appRoutes } from "./routes.js";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route
        path={appRoutes.root()}
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />
      <Route path={appRoutes.login()} element={<LoginPage />} />
      <Route path={appRoutes.signup()} element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

export default App;
