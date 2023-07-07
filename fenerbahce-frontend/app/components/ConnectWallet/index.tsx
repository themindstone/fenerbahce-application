import type { ReactElement } from "react";
import {
	Flex,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import { connectWalletEventBus } from "~/eventbus";
import { TokenLogoImage, MetamaskLogoImage, ParibuLogoImage } from "~/assets";
import { ColorfulBorderButton } from "~/components";
import { useConnectWallet } from "~/context";

const CustomButton = (props: ButtonProps) => (
	<ColorfulBorderButton from="var(--biscay)" to="var(--golden-fizz)" angle="to right" w="100%" {...props}>
		{props.children}
	</ColorfulBorderButton>
);

export const ConnectWallet = (): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const connectWallet = useConnectWallet();

	const connectWithMetamask = async () => {
		try {
			await connectWallet.connect();
			// KYCModalEventBus.publish("kycmodal.open");
			onClose();
		} catch {
			// show user an alert that he was unable to login with metamask
		}
	};

	const open = () => {
		connectWalletEventBus.publish("connectwallet.connectwalletmodalchange", true);
		onOpen();
	};

	const close = () => {
		connectWalletEventBus.publish("connectwallet.connectwalletmodalchange", false);
		onClose();
	};

	connectWalletEventBus.useListener("connectwallet.open", open, []);

	return (
		<Modal isOpen={isOpen} onClose={close}>
			<ModalOverlay />
			<ModalContent bg="#F5F5F5" maxW="400px" p="20px">
				<ModalCloseButton color="#000" />
				<ModalBody color="var(--biscay)">
					<VStack gap="10px">
						<Image src={TokenLogoImage} height="87px" />
						<VStack>
							<Heading size="md">Cüzdanı Bağla</Heading>
							<Text>Nasıl bağlanmak istediğinizi seçin.</Text>
						</VStack>
						<Flex direction="column" w="100%" gap="10px">
							<CustomButton leftIcon={<Image src={MetamaskLogoImage} />} onClick={connectWithMetamask}>
								Metamask Cüzdan
							</CustomButton>
							<CustomButton leftIcon={<Image src={ParibuLogoImage} />} disabled>
								Paribu Cüzdan
							</CustomButton>
						</Flex>
						<Text>Cüzdanlar hakkında daha fazla bilgi edinin.</Text>
					</VStack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
