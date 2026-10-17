export const queryKeys = {
  channels: ["channels"],
  messages: ["messages"],
};

const addToList = (item) => (list) => {
  if (!list || list.some(({ id }) => id === item.id)) {
    return list;
  }
  return [...list, item];
};

export const addChannel = (queryClient, channel) => {
  queryClient.setQueryData(queryKeys.channels, addToList(channel));
};

export const updateChannel = (queryClient, channel) => {
  queryClient.setQueryData(queryKeys.channels, (channels) => channels?.map(
    (item) => (item.id === channel.id ? { ...item, ...channel } : item),
  ));
};

export const deleteChannel = (queryClient, uiStore, { id }) => {
  queryClient.setQueryData(queryKeys.channels, (channels) => channels?.filter(
    (item) => item.id !== id,
  ));
  queryClient.setQueryData(queryKeys.messages, (messages) => messages?.filter(
    ({ channelId }) => channelId !== id,
  ));
  const { currentChannelId, setCurrentChannel } = uiStore.getState();
  if (currentChannelId === id) {
    setCurrentChannel(null);
  }
};

export const addMessage = (queryClient, message) => {
  queryClient.setQueryData(queryKeys.messages, addToList(message));
};
