import type { ReactElement } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

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
    ...rest
}: ColorfulBorderButtonProps) => {


    return <Button style={{
                    background: `linear-gradient(${angle}, white, white), 
                        linear-gradient(${angle}, ${from} , ${to})`, 
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",
                }}
                borderRadius={borderRadius}
                border={border}
                p="25px 0"
                {...rest}>
                    {children}
                </Button>
};