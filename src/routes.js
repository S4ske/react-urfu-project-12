const apiPath = "/api/v1";

export const apiRoutes = {
  login: () => `${apiPath}/login`,
  signup: () => `${apiPath}/signup`,
  channels: () => `${apiPath}/channels`,
  channel: (id) => `${apiPath}/channels/${id}`,
  messages: () => `${apiPath}/messages`,
};

export const appRoutes = {
  root: () => "/",
  login: () => "/login",
  signup: () => "/signup",
};
