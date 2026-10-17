import { ScrollArea, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";

const MessagesBox = ({ messages }) => {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    viewport?.scrollTo({ top: viewport.scrollHeight });
  }, [messages]);

  return (
    <ScrollArea flex={1} viewportRef={viewportRef} scrollbars="y" px="lg">
      <Stack gap="xs" py="md">
        {messages.map(({ id, username, body }) => (
          <Text key={id}>
            <Text span fw={700}>
              {username}
            </Text>
            {": "}
            {body}
          </Text>
        ))}
      </Stack>
    </ScrollArea>
  );
};

export default MessagesBox;
