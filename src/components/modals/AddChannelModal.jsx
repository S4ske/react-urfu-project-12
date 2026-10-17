import { useCreateChannel } from "../../hooks/chatQueries.js";
import ChannelNameForm from "./ChannelNameForm.jsx";

const AddChannelModal = ({ onClose }) => {
  const createChannel = useCreateChannel();

  const handleSubmit = async (name) => {
    await createChannel.mutateAsync({ name });
    onClose();
  };

  return <ChannelNameForm onSubmit={handleSubmit} onCancel={onClose} />;
};

export default AddChannelModal;
