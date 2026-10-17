import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import { appRoutes } from "../routes.js";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container py="xl">
      <Stack align="center">
        <Title order={1}>{t("notFound.title")}</Title>
        <Text c="dimmed">
          {`${t("notFound.text")} `}
          <Anchor component={Link} to={appRoutes.root()}>
            {t("notFound.link")}
          </Anchor>
        </Text>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
