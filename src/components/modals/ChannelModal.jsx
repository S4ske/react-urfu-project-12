import { Modal } from "@mantine/core";
import { useTranslation } from "react-i18next";

import { useChannels } from "../../hooks/chatQueries.js";
import { useUiStore } from "../../stores/hooks.js";
import AddChannelModal from "./AddChannelModal.jsx";
import RemoveChannelModal from "./RemoveChannelModal.jsx";
import RenameChannelModal from "./RenameChannelModal.jsx";

const modals = {
  add: { title: "modals.addTitle", Component: AddChannelModal },
  rename: { title: "modals.renameTitle", Component: RenameChannelModal },
  remove: { title: "modals.removeTitle", Component: RemoveChannelModal },
};

const ChannelModal = () => {
  const { t } = useTranslation();
  const modal = useUiStore((state) => state.modal);
  const closeModal = useUiStore((state) => state.closeModal);
  const { data: channels = [] } = useChannels();

  const config = modal && modals[modal.type];
  const channel = modal?.channelId ? channels.find(({ id }) => id === modal.channelId) : null;
  const isOpened = Boolean(config) && (!modal.channelId || Boolean(channel));

  return (
    <Modal opened={isOpened} onClose={closeModal} title={config && t(config.title)} centered>
      {isOpened && <config.Component channel={channel} onClose={closeModal} />}
    </Modal>
  );
};

export default ChannelModal;
