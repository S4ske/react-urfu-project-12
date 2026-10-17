import {
  addChannel,
  addMessage,
  deleteChannel,
  updateChannel,
} from "./hooks/chatCache.js";

const disconnectToastId = "socket-disconnected";

const subscribe = (socket, {
  queryClient,
  i18n,
  uiStore,
  toasts,
}) => {
  let wasConnected = socket.connected;
  uiStore.getState().setConnected(socket.connected);

  socket.on("connect", () => {
    uiStore.getState().setConnected(true);
    if (wasConnected) {
      toasts.hide(disconnectToastId);
      toasts.success(i18n.t("toasts.reconnected"));
      queryClient.invalidateQueries();
    }
    wasConnected = true;
  });

  socket.on("disconnect", (reason) => {
    uiStore.getState().setConnected(false);
    if (reason !== "io client disconnect") {
      toasts.error(i18n.t("toasts.disconnected"), { id: disconnectToastId, autoClose: false });
    }
  });

  socket.on("newMessage", (message) => addMessage(queryClient, message));
  socket.on("newChannel", (channel) => addChannel(queryClient, channel));
  socket.on("renameChannel", (channel) => updateChannel(queryClient, channel));
  socket.on("removeChannel", (payload) => deleteChannel(queryClient, uiStore, payload));
};

export default subscribe;
