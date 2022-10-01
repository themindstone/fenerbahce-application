import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { modal1907EventBus } from "~/eventbus";
import { Modal1907 } from "~/components";

export const ModalMediator = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [description, setDescription] = useState<string>("");
	const [isSucceed, setIsSucceed] = useState<boolean>(false);

	modal1907EventBus.useListener(
		"modal.open",
		({ isSucceed, description }) => {
			setIsSucceed(isSucceed);
			setDescription(description);
			onOpen();
		},
		[],
	);

	return <Modal1907 isOpen={isOpen} onClose={onClose} description={description} isSucceed={isSucceed}></Modal1907>;
};
