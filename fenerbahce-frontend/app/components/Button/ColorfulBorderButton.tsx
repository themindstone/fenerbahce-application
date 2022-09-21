import type { ReactElement } from "react";
import { Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";

interface ColorfulBorderButtonProps extends ButtonProps {
    from: string;
    to: string;
    angle: string;
}


export const ColorfulBorderButton = ({
    border = "3px solid transparent",
    children,
    angle,
    from,
    to,
    borderRadius = "9px",
    p="25px 0",
    ...rest
}: ColorfulBorderButtonProps): ReactElement => {


    return <Button style={{
                    background: `linear-gradient(${angle}, white, white), 
                        linear-gradient(${angle}, ${from} , ${to})`,
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",
                }}
                borderRadius={borderRadius}
                border={border}
                p={p}
                {...rest}>
                    {children}
                </Button>
};