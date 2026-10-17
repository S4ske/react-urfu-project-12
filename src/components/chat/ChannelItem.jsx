import { ActionIcon, Group, Menu, NavLink, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

import { useUiStore } from "../../stores/hooks.js";

const ChannelItem = ({ channel, isActive }) => {
  const { t } = useTranslation();
  const setCurrentChannel = useUiStore((state) => state.setCurrentChannel);
  const openModal = useUiStore((state) => state.openModal);

  const link = (
    <NavLink
      component="button"
      type="button"
      label={<Text inherit truncate="end">{t("channels.prefixedName", { name: channel.name })}</Text>}
      title={channel.name}
      active={isActive}
      variant="filled"
      flex={1}
      miw={0}
      onClick={() => setCurrentChannel(channel.id)}
    />
  );

  if (!channel.removable) {
    return link;
  }

  return (
    <Group gap={2} wrap="nowrap">
      {link}
      <Menu position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon
            variant={isActive ? "filled" : "subtle"}
            color={isActive ? undefined : "gray"}
            size="lg"
            aria-label={t("channels.manage")}
          >
            <IconChevronDown size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => openModal("remove", channel.id)}>
            {t("channels.remove")}
          </Menu.Item>
          <Menu.Item onClick={() => openModal("rename", channel.id)}>
            {t("channels.rename")}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default ChannelItem;
