import { ReactElement } from "react";
import { Image, ImageProps } from "@chakra-ui/react";
import Telegram from "~/assets/icons/telegram.svg";
import Facebook from "~/assets/icons/facebook.svg";
import Instagram from "~/assets/icons/instagram.svg";
import Twitter from "~/assets/icons/twitter.svg";
import User from "~/assets/icons/user-icon.svg";

import HeroImage from "./images/Hero.png";
import UniformImage from "./images/uniform.png";
import TokenLogoImage from "./images/token-logo.png";
import MetamaskLogoImage from "./images/metamask-logo.png";
import ParibuLogoImage from "./images/paribu-logo.png";

export const TelegramIcon = (props: ImageProps): ReactElement => <Image src={Telegram} {...props} />;
export const FacebookIcon = (props: ImageProps): ReactElement => <Image src={Facebook} {...props} />;
export const InstagramIcon = (props: ImageProps): ReactElement => <Image src={Instagram} {...props} />;
export const TwitterIcon = (props: ImageProps): ReactElement => <Image src={Twitter} {...props} />;

export const UserIcon = (props: ImageProps): ReactElement => <Image src={User} {...props} />;

export { HeroImage };
export { UniformImage };
export { TokenLogoImage };
export { MetamaskLogoImage };
export { ParibuLogoImage };
