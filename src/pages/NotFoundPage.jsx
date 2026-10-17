import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";

const NotFoundPage = () => (
  <Container py="xl">
    <Stack align="center">
      <Title order={1}>Страница не найдена</Title>
      <Text c="dimmed">
        Но вы можете перейти{" "}
        <Anchor component={Link} to="/">
          на главную страницу
        </Anchor>
      </Text>
    </Stack>
  </Container>
);

export default NotFoundPage;
