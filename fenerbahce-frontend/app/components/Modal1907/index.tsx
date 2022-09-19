import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, VStack, Image, Heading, Flex, Text, useDisclosure } from "@chakra-ui/react"
import { TokenLogoImage } from "~/assets"
import { GoldenFizzButton } from "~/components";
import { auctionResultModalEventBus } from "~/eventbus";


interface Modal1907Props {
	description: string;
	isSucceed: boolean;
	isOpen: boolean;
	onClose: () => void;
}

export const Modal1907 = ({ description, isSucceed, isOpen, onClose }: Modal1907Props) => {

	// const { isOpen, onClose } = useDisclosure();

	// const [isSucceed, setIsSucceed] = useState<boolean>(false);
	// const [description, setDescription] = useState<string>("");

	// auctionResultModalEventBus.useListener("auctionresultmodal.open", ({ isSucceed, description }) => {
	// 	// setIsSucceed(isSucceed);
	// 	// setDescription(description);
	// 	onOpen();
	// }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg="var(--governor-bay)" maxW="330px" p="20px" gap="10px">
				<ModalCloseButton color="#fff" />
				<ModalBody color="#fff">
					<VStack gap="0px">
						<Image src={TokenLogoImage} height="87px" />
						<VStack>
							<Heading size="lg">{isSucceed ? "İşlem Başarılı" : "Hata"}</Heading>
							<Text textAlign="center">{description}</Text>
						</VStack>
					</VStack>
				</ModalBody>
				<GoldenFizzButton w="100%" onClick={onClose}>Kapat</GoldenFizzButton>
			</ModalContent>
		</Modal>
    );
};
