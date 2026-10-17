import { notifications } from "@mantine/notifications";

export const createToasts = (store) => ({
  success: (message, options = {}) =>
    notifications.show({ color: "green", message, ...options }, store),
  error: (message, options = {}) =>
    notifications.show({ color: "red", message, ...options }, store),
  hide: (id) => notifications.hide(id, store),
});

export const isNetworkError = (error) => error instanceof TypeError;
