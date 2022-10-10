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
import { useForm, SubmitHandler } from "react-hook-form";
import { useConnectWallet, useKYC } from "~/context";
import { KYCModalEventBus, loadingModalEventBus, modal1907EventBus } from "~/eventbus";
import { GoldenFizzButton } from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import gPhoneNumber from "google-libphonenumber";

const schema = yup.object({
	fullname: yup.string().required("İsim bilgisi zorunludur."),
	email: yup.string().required("E-posta bilgisi zorunludur.").email("Email adresi geçerli değil."),
	phone: yup.string().phone("TR", false, "Telefon numarası geçerli değil.").required("Telefon numarası zorunludur."),
});

// const formatter = new AsYouTypeFormatter("US");

type KYCFormType = yup.InferType<typeof schema>;

const phoneUtil = gPhoneNumber.PhoneNumberUtil.getInstance();
const PNF = gPhoneNumber.PhoneNumberFormat;

// const e164ToDisplay = (e164: string): string => {
// 	try {
// 		const phoneNumber = phoneUtil.parse(e164);
// 		if (phoneNumber.getCountryCode() === 90) {
// 			return "+90 " + phoneUtil.format(phoneNumber, PNF.NATIONAL);
// 		}
// 		return phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
// 	} catch (e) {
// 		return e164;
// 	}
// };

const AsYouTypeFormatter = gPhoneNumber.AsYouTypeFormatter;

const formatPhoneNumberInternational = (rawNumber: string): string | undefined => {
	try {
		const phoneNumber = phoneUtil.parse(rawNumber);
		return phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
	} catch {
		return undefined;
	}
};

export const KYCModal = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm<KYCFormType>({ resolver: yupResolver(schema) });

	KYCModalEventBus.useListener(
		"kycmodal.open",
		() => {
			onOpen();
		},
		[],
	);

	const kyc = useKYC();
	const connectWallet = useConnectWallet();

	const createKYC: SubmitHandler<KYCFormType> = async ({ fullname, email, phone }: KYCFormType) => {
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

	const phoneInput = register("phone");

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
									_placeholder={{ color: "whiteAlpha.700" }}
									{...register("fullname")}
									bg="var(--indigo)"
								/>
								{errors.fullname && (
									<Text size="sm" mt="5px" color="red.400">
										{errors.fullname.message ? <>{errors.fullname.message}</> : ""}
									</Text>
								)}
							</Box>
							<Box>
								<FormLabel fontWeight="bold">E-posta adresiniz</FormLabel>
								<Input
									type="text"
									placeholder="E-posta adresiniz"
									_placeholder={{ color: "whiteAlpha.700" }}
									{...register("email")}
									bg="var(--indigo)"
								/>
								{errors.email && (
									<Text size="sm" mt="5px" color="red.400">
										{errors.email.message ? <>{errors.email.message}</> : ""}
									</Text>
								)}
							</Box>
							<Box>
								<FormLabel fontWeight="bold">Telefon Numaranız</FormLabel>
								<Input
									type="text"
									placeholder="+90 (___) (___) (__) (__)"
									_placeholder={{ color: "whiteAlpha.700" }}
									bg="var(--indigo)"
									{...phoneInput}
									onChange={e => {
										phoneInput.onChange(e);
										const formatter = new AsYouTypeFormatter("TR");
										formatter.clear();
										let l = "";
										e.target.value.split("").filter(i => i !== " ").forEach(i => {
											l = formatter.inputDigit(i);
										});
										const p = phoneUtil.format(
											phoneUtil.parseAndKeepRawInput(l, "TR"),
											gPhoneNumber.PhoneNumberFormat.INTERNATIONAL,
										);
										e.target.value = p.trim();
									}}
									onKeyUp={e => {}}
								/>
								{errors.phone && (
									<Text size="sm" mt="5px" color="red.400">
										{errors.phone.message ? <>{errors.phone.message}</> : ""}
									</Text>
								)}
							</Box>
							<GoldenFizzButton type="submit">SUBMIT</GoldenFizzButton>
						</Flex>
					</form>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
};
