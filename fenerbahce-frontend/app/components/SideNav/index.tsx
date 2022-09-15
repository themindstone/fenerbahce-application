import { Flex, Heading, Image, useOutsideClick, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { sideNavEventBus } from "~/eventbus";
import { motion } from "framer-motion";
import { TokenLogoImage, UserIcon } from "~/assets";
import { ISideNavLink, ISocialMediaIcon } from "~/interfaces";
import { sidenavlink } from "~/data";
import { GoldenFizzButton } from "~/components";
import { socialmediaicons } from "~/data";
import { useConnectWallet } from "~/context";
import { useConnectWalletModal } from "~/hooks";

interface SideNavLinkProps extends Omit<ISideNavLink, "id"> {
};

interface SideNavSocialMediaIconProps {
    Icon: () => ReactElement;
    link: string;
}

const SideNavSocialMediaIcon = ({
    Icon,
    link
}: SideNavSocialMediaIconProps): ReactElement => {

    return (<Link href={link} target="_blank">
        <Icon />
    </Link>);
}

const SideNavLink = ({
    text,
    href,
}: SideNavLinkProps): ReactElement => {

    return (
        <Link href={href} fontSize="lg">{text}</Link>
    );
};

export const SideNav = (): ReactElement => {

    const { isConnectWalletModalOpen, connectWalletModalOpen } = useConnectWalletModal();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const connectWallet = useConnectWallet();

    const ref = useRef() as React.Ref<HTMLDivElement>;

    const [max400] = useMediaQuery("(max-width: 400px)");
    const [min991] = useMediaQuery("(min-width: 991px)");

    useEffect(() => {
        if (min991) {
            setIsOpen(false);
        }
    }, [min991])

    useOutsideClick({
        ref: ref as React.RefObject<HTMLDivElement>,
        handler: () => {
            setIsOpen(false);
        },
        enabled: !isConnectWalletModalOpen
    });

    sideNavEventBus.useListener("sidenav.open", () => {
        setIsOpen(true)
    }, []);

    sideNavEventBus.useListener("sidenav.close", () => {
        setIsOpen(false)
    }, []);

    sideNavEventBus.useListener("sidenav.toggle", () => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    
    const w = useMemo<number>(() => {
        return max400 ? 230: 300
    }, [max400]);

    return (<motion.div 
        animate={{
            backgroundColor: isOpen ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.0)",
        }} style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            zIndex: 3,
            display: "flex",
            flexDirection: "row-reverse",
            pointerEvents: isOpen ? "all" : "none",
            cursor: "pointer",
        }}>
            <motion.div
                ref={ref}
                animate={{
                    marginRight: isOpen ? "0px" : `${-1 * w}px`
                }}
                style={{
                    cursor: "initial",
                    background: "var(--governor-bay)",
                    height: "100%",
                    width: `${w}px`,
                    marginRight: "-400px",
                    padding: "25px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    fontWeight: "bold",
                    gap: "20px",
                }}>
                    <Flex alignItems="center" gap="15px">
                        <Image src={TokenLogoImage} h="60px" />
                        <Heading fontSize="24px">Fenerbahce Token</Heading>
                    </Flex>
                    <Flex direction="column" gap="10px">
                        {sidenavlink.map((item: ISideNavLink) => {
                            return (<SideNavLink href={item.href} text={item.text} key={item.id} />)
                        })}
                    </Flex>
                    {connectWallet.connectionState === "disconnected" &&
                        <GoldenFizzButton leftIcon={<UserIcon />} fontWeight="bold" onClick={connectWalletModalOpen}>Giris Yap</GoldenFizzButton>
                    }
                    {connectWallet.connectionState === "connected" &&
                        <GoldenFizzButton maxW="100%" bg="var(--golden-fizz)">
                            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{connectWallet.address}</Text>
                            <Text p="0" m="0">{connectWallet.address.substring(connectWallet.address.length - 6, connectWallet.address.length)}</Text>
                        </GoldenFizzButton>
                    }
                    <Flex mt="auto" h="40px" justifyContent="space-between">
                        {socialmediaicons.map((item: ISocialMediaIcon) => {
                            return <SideNavSocialMediaIcon Icon={item.Icon} link={item.link} key={item.key} />
                        })}
                    </Flex>
                    <Text align="center">&copy; 2022 Fenerbahce Token</Text>
            </motion.div>
    </motion.div>);
};
