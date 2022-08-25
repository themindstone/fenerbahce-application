import { ReactElement, SVGProps } from "react";
import { Image, ImageProps } from "@chakra-ui/react";
import Telegram from "~/assets/icons/telegram.svg";
import Facebook from "~/assets/icons/facebook.svg";
import Instagram from "~/assets/icons/instagram.svg";
import Twitter from "~/assets/icons/twitter.svg";
import User from "~/assets/icons/user-icon.svg";
import Close from "~/assets/icons/close-icon.svg";
import Copy from "~/assets/icons/copy-icon.svg";
import ViewEtherscan from "~/assets/icons/view-etherscan.svg";
// import ArrowForwardIcon from "~/assets/icons/arrow-forward.svg";
// import ArrowBackIcon from "~/assets/icons/arrow-back.svg";

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
export const CloseIcon = (props: ImageProps): ReactElement => <Image src={Close} {...props} />;
export const CopyIcon = (props: ImageProps): ReactElement => <Image src={Copy} {...props} />;
export const ViewEtherscanIcon = (props: ImageProps): ReactElement => <Image src={ViewEtherscan} {...props} />;
// export const ArrowForwardIcon = (props: ImageProps): ReactElement => <Image src={ArrowForward} {...props} />;
export const ArrowForwardIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
export const ArrowBackIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;

export { HeroImage };
export { UniformImage };
export { TokenLogoImage };
export { MetamaskLogoImage };
export { ParibuLogoImage };

// export { ArrowForwardIcon };
// export { ArrowBackIcon };
