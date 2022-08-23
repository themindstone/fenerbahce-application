import { ReactElement } from "react";
import { Image } from "@chakra-ui/react";
import Telegram from "~/assets/icons/telegram.svg";
import Facebook from "~/assets/icons/facebook.svg";
import Instagram from "~/assets/icons/instagram.svg";
import Twitter from "~/assets/icons/twitter.svg";

import HeroImage from "./images/Hero.png";
import UniformImage from "./images/uniform.png";
import TokenLogoImage from "./images/token-logo.png";
import MetamaskLogoImage from "./images/metamask-logo.png";
import ParibuLogoImage from "./images/paribu-logo.png";

export const TelegramIcon = (): ReactElement => <Image src={Telegram} />;
export const FacebookIcon = (): ReactElement => <Image src={Facebook} />;
export const InstagramIcon = (): ReactElement => <Image src={Instagram} />;
export const TwitterIcon = (): ReactElement => <Image src={Twitter} />;

export { HeroImage };
export { UniformImage };
export { TokenLogoImage };
export { MetamaskLogoImage };
export { ParibuLogoImage };
