import { Button, Container, Group, Title } from "@mantine/core";

import useAuthStore from "../stores/authStore.js";

const ChatPage = () => {
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <Container py="xl">
      <Group justify="space-between">
        <Title order={1}>Hexlet Chat</Title>
        <Button variant="default" onClick={logOut}>
          Выйти
        </Button>
      </Group>
    </Container>
  );
};

export default ChatPage;
