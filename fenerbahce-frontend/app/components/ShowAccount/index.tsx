import { Box, Flex, useOutsideClick } from "@chakra-ui/react";
import { LegacyRef, ReactElement, useEffect, useReducer, useRef } from "react";
import React from "react";
import { connectWalletEventBus } from "~/eventbus";

export const ShowAccount = (): ReactElement => {

    const isOpenReducer = (_: boolean, action: boolean) => {
        connectWalletEventBus.publish("connectwallet.accountmodalchange", action);
        return action;
    }
    
    const [isOpen, setIsOpen] = useReducer(isOpenReducer, false);

    const ref = useRef() as LegacyRef<HTMLDivElement>;

    useOutsideClick({
        ref: ref as React.RefObject<HTMLElement>,
        handler: () => {
            if (isOpen) {
                setIsOpen(false);
            }
        },
    });

    connectWalletEventBus.useListener("connectwallet.toggleaccountmodal", () => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    useEffect(() => {
        connectWalletEventBus.publish("connectwallet.accountmodalchange", isOpen);
    });

    if (!isOpen) {
        return <div></div>;
    }

    return (<Flex direction="column" bg="red" ref={ref}>
        <Box>merhabadunya</Box>
        <Box>merhabadunya</Box>
        <Box>merhabadunya</Box>
    </Flex>);
};