import { useRenameChannel } from "../../hooks/chatQueries.js";
import ChannelNameForm from "./ChannelNameForm.jsx";

const RenameChannelModal = ({ channel, onClose }) => {
  const renameChannel = useRenameChannel();

  const handleSubmit = async (name) => {
    await renameChannel.mutateAsync({ id: channel.id, name });
    onClose();
  };

  return (
    <ChannelNameForm
      initialName={channel.name}
      onSubmit={handleSubmit}
      onCancel={onClose}
    />
  );
};

export default RenameChannelModal;
