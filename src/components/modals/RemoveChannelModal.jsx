import { Button, Group, Stack, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useRemoveChannel } from "../../hooks/chatQueries.js";

const RemoveChannelModal = ({ channel, onClose }) => {
  const { t } = useTranslation();
  const removeChannel = useRemoveChannel();

  const handleRemove = () => {
    removeChannel.mutate({ id: channel.id }, { onSuccess: onClose });
  };

  return (
    <Stack>
      <Text>{t("modals.confirmRemove")}</Text>
      {removeChannel.isError && (
        <Text c="red" size="sm">
          {t("errors.networkRetry")}
        </Text>
      )}
      <Group justify="flex-end" gap="xs">
        <Button variant="default" onClick={onClose} disabled={removeChannel.isPending}>
          {t("modals.cancel")}
        </Button>
        <Button color="red" data-autofocus onClick={handleRemove} loading={removeChannel.isPending}>
          {t("modals.remove")}
        </Button>
      </Group>
    </Stack>
  );
};

export default RemoveChannelModal;
