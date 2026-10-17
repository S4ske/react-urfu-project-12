import { ActionIcon, Group, ScrollArea, Stack, Text, VisuallyHidden } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { useChannels } from "../../hooks/chatQueries.js";
import useCurrentChannel from "../../hooks/useCurrentChannel.js";
import { useUiStore } from "../../stores/hooks.js";
import ChannelItem from "./ChannelItem.jsx";

const ChannelsList = () => {
  const { t } = useTranslation();
  const { data: channels = [] } = useChannels();
  const currentChannel = useCurrentChannel();
  const openModal = useUiStore((state) => state.openModal);
  const viewportRef = useRef(null);

  useEffect(() => {
    viewportRef.current?.querySelector("[data-active]")?.scrollIntoView({ block: "nearest" });
  }, [currentChannel?.id]);

  return (
    <Stack gap="xs" h="100%">
      <Group justify="space-between" wrap="nowrap" px="sm" pt="md">
        <Text fw={700}>{t("channels.title")}</Text>
        <ActionIcon variant="subtle" title={t("channels.add")} onClick={() => openModal("add")}>
          <IconPlus size={18} />
          <VisuallyHidden>{t("channels.addShort")}</VisuallyHidden>
        </ActionIcon>
      </Group>
      <ScrollArea flex={1} viewportRef={viewportRef} scrollbars="y">
        <Stack gap={4} px="xs" pb="xs">
          {channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              channel={channel}
              isActive={channel.id === currentChannel?.id}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default ChannelsList;
