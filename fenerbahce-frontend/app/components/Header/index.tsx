import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { GoldenFizzButton } from "../Button";


interface NavLinkProps {
    children?: React.ReactNode;
}

const NavLink = ({
    children,
    ...rest
}: NavLinkProps): ReactElement => {

    return <Link {...rest} fontWeight="bold">{children}</Link>
}

export const Header = (): ReactElement => {


    return (<Flex justifyContent="space-between" p="10px 80px">
        <Flex gap="20px" alignItems="center">
            <Flex gap="10px" alignItems="center">
                <Image src="/images/token-logo.png" w="60px" />
                <Text fontWeight="bold">FENERBAHÇE <br /> TOKEN</Text>
            </Flex>
            <Text
                bg="white"
                color="var(--biscay)"
                fontWeight="bold"
                p="5px 10px"
                borderRadius="5px"
                fontSize="16px"
            >FB Token: 36.05₺</Text>
        </Flex>
        <Flex gap="30px" alignItems="center">
            <NavLink>HAKKINDA</NavLink>
            <NavLink>FAYDALAR</NavLink>
            <NavLink>ŞARTLAR</NavLink>
            <NavLink>S.S.S</NavLink>
            <NavLink>EN</NavLink>
            <GoldenFizzButton>Giris yap</GoldenFizzButton>
        </Flex>
    </Flex>)
}