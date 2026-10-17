import {
  Button,
  Center,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";

const ErrorFallback = () => {
  const { t } = useTranslation();

  return (
    <Center mih="100dvh" p="md">
      <Stack align="center">
        <Title order={2} ta="center">{t("errorBoundary.title")}</Title>
        <Text c="dimmed" ta="center">{t("errorBoundary.text")}</Text>
        <Button onClick={() => window.location.reload()}>
          {t("errorBoundary.reload")}
        </Button>
      </Stack>
    </Center>
  );
};

export default ErrorFallback;
