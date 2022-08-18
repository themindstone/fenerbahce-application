import { Box, Flex, Heading } from "@chakra-ui/react";
import type { ReactElement } from "react";

import Steps from "rc-steps";

export const ProjectCalendar = (): ReactElement => {

    return <Flex gap="40px" direction="column">
        <Heading>Proje Takvimi</Heading>
        <Steps current={1}>
            <Steps.Step title="first" />
            <Steps.Step title="second" />
            <Steps.Step title="third" />
        </Steps>
        <Box>merhaba dunya</Box>
    </Flex>
};