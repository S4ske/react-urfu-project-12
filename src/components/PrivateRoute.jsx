import { Navigate } from "react-router";

import { appRoutes } from "../routes.js";
import useAuthStore from "../stores/authStore.js";

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to={appRoutes.login()} replace />;
  }

  return children;
};

export default PrivateRoute;
