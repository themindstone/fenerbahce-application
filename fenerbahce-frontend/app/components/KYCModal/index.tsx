import {
	Box,
	Flex,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useConnectWallet, useKYC } from "~/context";
import { KYCModalEventBus, loadingModalEventBus, modal1907EventBus } from "~/eventbus";
import { GoldenFizzButton } from "../Button";

export const KYCModal = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const { handleSubmit, register } = useForm();

	KYCModalEventBus.useListener(
		"kycmodal.open",
		() => {
			onOpen();
		},
		[],
	);

	const kyc = useKYC();
	const connectWallet = useConnectWallet();

	console.log("merhaba");

	const createKYC = async ({ fullname, email, phone }: any) => {
		if (!connectWallet.address) {
			return;
		}
		try {
			loadingModalEventBus.publish("loadingmodal.open", { message: "KYC sistemine kaydınız ekleniyor..." });
			const { errorMessage } = await kyc.create({ fullname, email, phone, address: connectWallet.address });
			if (errorMessage) {
				modal1907EventBus.publish("modal.open", { isSucceed: false, description: errorMessage });
			} else {
				modal1907EventBus.publish("modal.open", {
					isSucceed: true,
					description: "KYC sistemine kaydınız eklendi",
				});
				onClose();
			}
		} catch (e: any) {
		} finally {
			loadingModalEventBus.publish("loadingmodal.close");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent bg="var(--governor-bay)" p="20px">
					<ModalCloseButton></ModalCloseButton>
					<form onSubmit={handleSubmit(createKYC)}>
						<Flex direction="column" gap="20px">
							<Heading size="md">KYC Kayıt İşlemi</Heading>
							<Text>KYC kayıt işlemini tamamlamak için gerekli bilgileri doldurmanız gerekmektedir.</Text>
							<Box>
								<FormLabel fontWeight="bold">İsminiz</FormLabel>
								<Input
									type="text"
									placeholder="İsminiz"
									_placeholder={{ color: "whiteAlpha.700"}}
									// defaultValue="Enes ince"
									{...register("fullname")}
									bg="var(--indigo)"
								/>
							</Box>
							<Box>
								<FormLabel fontWeight="bold">Telefon Numaranız</FormLabel>
								<Input
									type="text"
									placeholder="Telefon Numaranız"
									_placeholder={{ color: "whiteAlpha.700"}}
									bg="var(--indigo)"
									// defaultValue="+905441700127"
									{...register("phone")}
								/>
							</Box>
							<Box>
								<FormLabel fontWeight="bold">E-posta adresiniz</FormLabel>
								<Input
									type="text"
									placeholder="E-posta adresiniz"
									_placeholder={{ color: "whiteAlpha.700"}}
									// defaultValue="inceenes10@gmail.com"
									{...register("email")}
									bg="var(--indigo)"
								/>
							</Box>
							{/* <Box>
								<FormLabel fontWeight="bold">Adresiniz</FormLabel>
								<Input
									type="text"
									placeholder="Adresiniz"
									value="address"
									{...register("homeAddress")}
								/>
							</Box> */}
							{/* <Input type="hidden" value={connectWallet.address} {...register("address")} /> */}
							<GoldenFizzButton type="submit">SUBMIT</GoldenFizzButton>
						</Flex>
					</form>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
};
