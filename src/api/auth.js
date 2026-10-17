import { apiRoutes } from "../routes.js";
import { request } from "./client.js";

export const login = ({ username, password }) => (
  request("POST", apiRoutes.login(), { body: { username, password } })
);

export const signup = ({ username, password }) => (
  request("POST", apiRoutes.signup(), { body: { username, password } })
);
