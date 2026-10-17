import { apiRoutes } from "../routes.js";

export class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

export const login = async ({ username, password }) => {
  const response = await fetch(apiRoutes.login(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
};
