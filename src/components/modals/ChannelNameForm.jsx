import { Button, Group, Stack, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";

import { useChannels } from "../../hooks/chatQueries.js";
import { cleanText } from "../../utils/profanity.js";

const ChannelNameForm = ({ initialName = "", onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { data: channels = [] } = useChannels();
  const names = channels.map(({ name }) => name);

  const form = useForm({
    initialValues: {
      name: initialName,
    },
    validate: {
      name: (value) =>
        hasLength({ min: 3, max: 20 }, t("errors.length", { min: 3, max: 20 }))(value) ??
        (names.includes(cleanText(value)) ? t("errors.unique") : null),
    },
  });

  const handleSubmit = async ({ name }) => {
    try {
      await onSubmit(cleanText(name));
    } catch {
      form.setFieldError("name", t("errors.networkRetry"));
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack>
        <TextInput
          data-autofocus
          name="name"
          label={t("modals.channelName")}
          autoComplete="off"
          readOnly={form.submitting}
          {...form.getInputProps("name")}
        />
        <Group justify="flex-end" gap="xs">
          <Button variant="default" onClick={onCancel} disabled={form.submitting}>
            {t("modals.cancel")}
          </Button>
          <Button type="submit" loading={form.submitting}>
            {t("modals.submit")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ChannelNameForm;
