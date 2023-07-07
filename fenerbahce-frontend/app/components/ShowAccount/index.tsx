import { Flex, Heading, Text, useOutsideClick, Link, Icon } from "@chakra-ui/react";
import type { LegacyRef, ReactElement } from "react";
import React, { useEffect, useReducer, useRef } from "react";
import { connectWalletEventBus } from "~/eventbus";
import { CloseIcon, CopyIcon, ViewEtherscanIcon } from "~/assets";
import { useConnectWallet } from "~/context";

const isOpenReducer = (_: boolean, action: boolean) => {
	connectWalletEventBus.publish("connectwallet.accountmodalchange", action);
	return action;
};

export const ShowAccount = (): ReactElement => {
	const [isOpen, setIsOpen] = useReducer(isOpenReducer, false);

	const ref = useRef() as LegacyRef<HTMLDivElement>;

	const connectWallet = useConnectWallet();

	useOutsideClick({
		ref: ref as React.RefObject<HTMLElement>,
		handler: () => {
			if (isOpen) {
				setIsOpen(false);
			}
		},
	});

	connectWalletEventBus.useListener(
		"connectwallet.toggleaccountmodal",
		() => {
			setIsOpen(!isOpen);
		},
		[isOpen],
	);
	// TODO: useEffect deps
	useEffect(() => {
		connectWalletEventBus.publish("connectwallet.accountmodalchange", isOpen);
	});

	const close = () => {
		setIsOpen(false);
	};

	const copy = () => {
		navigator.clipboard.writeText(connectWallet.address);
	};

	if (!isOpen) {
		return <div></div>;
	}

	return (
		<Flex
			direction="column"
			bg="#f5f5f5"
			gap="15px"
			borderRadius="10px"
			ref={ref}
			p="20px"
			color="var(--biscay)"
			pos="relative">
			<CloseIcon h="20px" pos="absolute" right="20px" cursor="pointer" onClick={close} />
			<Heading size="md">Bağlı Hesap</Heading>
			<Flex justifyContent="space-between" cursor="pointer" maxW="calc(100% - 30px)" gap="10px" onClick={copy}>
				<Flex maxW="100%">
					<Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
						{connectWallet.address}
					</Text>
					<Text p="0" m="0">
						{connectWallet.address.substring(
							connectWallet.address.length - 6,
							connectWallet.address.length,
						)}
					</Text>
				</Flex>

				<CopyIcon h="20px" />
			</Flex>
			{/* <CustomButton>Bağlantıyı kes</CustomButton> */}
			<Link href="#">
				<Flex gap="10px" alignItems="center" justifyContent="center">
					<Icon as={ViewEtherscanIcon}></Icon>
					<a
						target="_blank"
						href="https://etherscan.io/address/0xFB19075D77a0F111796FB259819830F4780f1429"
						rel="noreferrer">
						<Text textAlign="center">View on Etherscan</Text>
					</a>
				</Flex>
			</Link>
		</Flex>
	);
};
