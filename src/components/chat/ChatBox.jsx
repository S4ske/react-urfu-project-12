import { Alert, Box, Divider, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useMessages } from "../../hooks/chatQueries.js";
import useCurrentChannel from "../../hooks/useCurrentChannel.js";
import { useUiStore } from "../../stores/hooks.js";
import MessageForm from "./MessageForm.jsx";
import MessagesBox from "./MessagesBox.jsx";

const ChatBox = () => {
  const { t } = useTranslation();
  const currentChannel = useCurrentChannel();
  const isConnected = useUiStore((state) => state.isConnected);
  const { data: messages = [] } = useMessages();
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannel?.id);

  return (
    <Stack gap={0} h="100%">
      <Box px="lg" py="md" bg="gray.0" miw={0}>
        <Text fw={700} truncate="end">
          {currentChannel && t("channels.prefixedName", { name: currentChannel.name })}
        </Text>
        <Text size="sm" c="dimmed">
          {t("chat.messagesCount", { count: channelMessages.length })}
        </Text>
      </Box>
      <Divider />
      {!isConnected && (
        <Alert color="yellow" radius={0} py="xs">
          {t("chat.disconnected")}
        </Alert>
      )}
      <MessagesBox messages={channelMessages} />
      <MessageForm channelId={currentChannel?.id} />
    </Stack>
  );
};

export default ChatBox;
