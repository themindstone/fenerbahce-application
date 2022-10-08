import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Modal1907 } from "~/components";
import { modal1907EventBus } from "~/eventbus";

export const AdminModal = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const [description, setDescription] = useState<string>("");
	const [isSucceed, setIsSucceed] = useState<boolean>(false);

	modal1907EventBus.useListener(
		"modal.open",
		({ isSucceed, description }) => {
			setDescription(description);
			setIsSucceed(isSucceed);
			onOpen();
		},
		[],
	);

	return <Modal1907 description={description} isOpen={isOpen} isSucceed={isSucceed} onClose={onClose}></Modal1907>;
};
