import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import {
  createChannel,
  createMessage,
  fetchChannels,
  fetchMessages,
  removeChannel,
  renameChannel,
} from "../api/chat.js";
import { useAuthStore, useStores, useToasts } from "../stores/hooks.js";
import {
  addChannel,
  addMessage,
  deleteChannel,
  queryKeys,
  updateChannel,
} from "./chatCache.js";

export const useChannels = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.channels,
    queryFn: () => fetchChannels(token),
  });
};

export const useMessages = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.messages,
    queryFn: () => fetchMessages(token),
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (message) => createMessage(token, message),
    onSuccess: (message) => addMessage(queryClient, message),
  });
};

export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const { uiStore } = useStores();
  const toasts = useToasts();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (channel) => createChannel(token, channel),
    onSuccess: (channel) => {
      addChannel(queryClient, channel);
      uiStore.getState().setCurrentChannel(channel.id);
      toasts.success(t("toasts.channelCreated"));
    },
  });
};

export const useRenameChannel = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const toasts = useToasts();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (channel) => renameChannel(token, channel),
    onSuccess: (channel) => {
      updateChannel(queryClient, channel);
      toasts.success(t("toasts.channelRenamed"));
    },
  });
};

export const useRemoveChannel = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const { uiStore } = useStores();
  const toasts = useToasts();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (channel) => removeChannel(token, channel),
    onSuccess: (_data, variables) => {
      deleteChannel(queryClient, uiStore, variables);
      toasts.success(t("toasts.channelRemoved"));
    },
  });
};
