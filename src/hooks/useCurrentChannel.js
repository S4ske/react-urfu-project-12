import { useUiStore } from "../stores/hooks.js";
import { useChannels } from "./chatQueries.js";

const useCurrentChannel = () => {
  const currentChannelId = useUiStore((state) => state.currentChannelId);
  const { data: channels = [] } = useChannels();

  return channels.find(({ id }) => id === currentChannelId) ?? channels[0] ?? null;
};

export default useCurrentChannel;
