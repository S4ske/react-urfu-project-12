import {
  Alert,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Paper,
} from "@mantine/core";
import { useTranslation } from "react-i18next";

import ChannelsList from "../components/chat/ChannelsList.jsx";
import ChatBox from "../components/chat/ChatBox.jsx";
import ChannelModal from "../components/modals/ChannelModal.jsx";
import { useChannels, useMessages } from "../hooks/chatQueries.js";

const ChatContent = () => {
  const { t } = useTranslation();
  const channels = useChannels();
  const messages = useMessages();

  if (channels.isPending || messages.isPending) {
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );
  }

  if (channels.isError || messages.isError) {
    return (
      <Center h="100%">
        <Alert color="red" title={t("chat.loadError")}>
          <Button
            mt="sm"
            variant="light"
            color="red"
            onClick={() => {
              channels.refetch();
              messages.refetch();
            }}
          >
            {t("chat.retry")}
          </Button>
        </Alert>
      </Center>
    );
  }

  return (
    <Paper withBorder radius="md" h="100%">
      <Flex h="100%">
        <Flex direction="column" w={{ base: 140, sm: 220 }} miw={{ base: 140, sm: 220 }} bg="gray.0">
          <ChannelsList />
        </Flex>
        <Divider orientation="vertical" />
        <Flex direction="column" flex={1} miw={0}>
          <ChatBox />
        </Flex>
      </Flex>
      <ChannelModal />
    </Paper>
  );
};

const ChatPage = () => (
  <Container size="lg" h="100%">
    <ChatContent />
  </Container>
);

export default ChatPage;
