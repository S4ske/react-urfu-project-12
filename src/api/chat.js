import { apiRoutes } from "../routes.js";
import { request } from "./client.js";

export const fetchChannels = (token) => request("GET", apiRoutes.channels(), { token });

export const createChannel = (token, { name }) =>
  request("POST", apiRoutes.channels(), { token, body: { name } });

export const renameChannel = (token, { id, name }) =>
  request("PATCH", apiRoutes.channel(id), { token, body: { name } });

export const removeChannel = (token, { id }) => request("DELETE", apiRoutes.channel(id), { token });

export const fetchMessages = (token) => request("GET", apiRoutes.messages(), { token });

export const createMessage = (token, message) =>
  request("POST", apiRoutes.messages(), { token, body: message });
