import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useCreateMessage } from "../../hooks/chatQueries.js";
import { useAuthStore } from "../../stores/hooks.js";
import { cleanText } from "../../utils/profanity.js";

const MessageForm = ({ channelId }) => {
  const { t } = useTranslation();
  const username = useAuthStore((state) => state.username);
  const createMessage = useCreateMessage();
  const inputRef = useRef(null);

  const form = useForm({
    initialValues: {
      body: "",
    },
    validate: {
      body: (value) => (value.trim() ? null : true),
    },
  });

  useEffect(() => {
    if (!form.submitting) {
      inputRef.current?.focus();
    }
  }, [channelId, form.submitting]);

  const handleSubmit = async ({ body }) => {
    try {
      await createMessage.mutateAsync({ body: cleanText(body), channelId, username });
      form.reset();
    } catch {
      form.setFieldError("body", t("messageForm.sendError"));
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Group gap="xs" wrap="nowrap" align="flex-start" p="lg">
        <TextInput
          ref={inputRef}
          flex={1}
          name="body"
          aria-label={t("messageForm.label")}
          placeholder={t("messageForm.placeholder")}
          autoComplete="off"
          readOnly={form.submitting}
          {...form.getInputProps("body")}
        />
        <Button
          type="submit"
          loading={form.submitting}
          disabled={!channelId || !form.values.body.trim()}
        >
          {t("messageForm.submit")}
        </Button>
      </Group>
    </form>
  );
};

export default MessageForm;
