import { createStore } from "zustand/vanilla";

const createUiStore = () =>
  createStore()((set) => ({
    currentChannelId: null,
    modal: null,
    isConnected: true,
    setCurrentChannel: (currentChannelId) => set({ currentChannelId }),
    openModal: (type, channelId = null) => set({ modal: { type, channelId } }),
    closeModal: () => set({ modal: null }),
    setConnected: (isConnected) => set({ isConnected }),
    reset: () => set({ currentChannelId: null, modal: null }),
  }));

export default createUiStore;
