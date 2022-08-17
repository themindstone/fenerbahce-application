import React from "react";
import type { ReactElement } from "react";
import { Flex, Grid, Heading, Image } from "@chakra-ui/react";
import { homeutility } from "~/data";
import type { IHomeUtility } from "~/interfaces";

interface UtilityCardProps extends IHomeUtility {}

const UtilityCard = (props: UtilityCardProps): ReactElement => {

    return (<Flex direction="column" gap="20px">
        <Image src={props.avatarUrl} />
    </Flex>);
}

export const Utility = (): ReactElement => {

    return (<Flex direction="column" maxW="1200px" m="100px auto" gap="30px" alignItems="center" textAlign="center">
        <Heading maxW="30ch">Fenerbahce Token taraftarlara hangi avantajlari saglayacak?</Heading>
        <Grid gridTemplateColumns={["repeat(4, 1fr)"]} w="100%" bg="red">
            {homeutility.map((item, index) => {
                return (<UtilityCard
                    key={index}
                    avatarUrl={item.avatarUrl}
                    title={item.title}
                    text={item.text}
                />)
            })}
        </Grid>
    </Flex>)
};