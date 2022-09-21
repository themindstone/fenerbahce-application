import { IconButton } from "@chakra-ui/react";
import type { IconButtonProps } from "@chakra-ui/react";
import type { ReactElement } from "react";


export const GoldenFizzIconButton = (props: IconButtonProps): ReactElement => {

    return <IconButton {...props} backgroundColor="var(--golden-fizz)" />
}