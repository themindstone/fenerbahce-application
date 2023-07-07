import { Box, Modal, ModalOverlay, Spinner, useDisclosure, VStack } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { loadingModalEventBus } from "~/eventbus";

export const LoadingModal = (): ReactElement => {
	const [message, setMessage] = useState<string>("Açık artırma hemen al teklifiniz veriliyor...");

	const { isOpen, onClose, onOpen } = useDisclosure();

	loadingModalEventBus.useListener(
		"loadingmodal.open",
		params => {
			onOpen();
			setMessage(params.message);
		},
		[],
	);

	loadingModalEventBus.useListener(
		"loadingmodal.close",
		() => {
			onClose();
		},
		[],
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
			<ModalOverlay display="grid" placeContent="center" bg="blackAlpha.800">
				<VStack gap="30px">
					<Spinner height="50px" width="50px"></Spinner>
					<Box height="200px" fontSize="2xl">
						{message}
					</Box>
				</VStack>
			</ModalOverlay>
		</Modal>
	);
};
