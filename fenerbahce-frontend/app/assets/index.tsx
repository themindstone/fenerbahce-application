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
import Menu from "~/assets/icons/menu-icon.svg";

import HeroImage from "./images/Hero.png";
import UniformImage from "./images/uniform.png";
import TokenLogoImage from "./images/token-logo.png";
import MetamaskLogoImage from "./images/metamask-logo.png";
import ParibuLogoImage from "./images/paribu-logo.png";
import UniformImage1 from "./images/product/uniform1.png";
import UniformImage2 from "./images/product/uniform2.png";
import UniformImage3 from "./images/product/uniform3.png";
import UniformImage4 from "./images/product/uniform4.png";

export const TelegramIcon = (props: ImageProps): ReactElement => <Image src={Telegram} {...props} />;
export const FacebookIcon = (props: ImageProps): ReactElement => <Image src={Facebook} {...props} />;
export const InstagramIcon = (props: ImageProps): ReactElement => <Image src={Instagram} {...props} />;
export const TwitterIcon = (props: ImageProps): ReactElement => <Image src={Twitter} {...props} />;

export const UserIcon = (props: ImageProps): ReactElement => <Image src={User} {...props} />;
export const CloseIcon = (props: ImageProps): ReactElement => <Image src={Close} {...props} />;
export const CopyIcon = (props: ImageProps): ReactElement => <Image src={Copy} {...props} />;
export const ViewEtherscanIcon = (props: ImageProps): ReactElement => <Image src={ViewEtherscan} {...props} />;
export const ArrowForwardIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
export const ArrowBackIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;
export const PlusIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" {...props}><path d="M40 128h176"/><path d="M128 40v176"/></svg>;
export const MenuIcon = (props: ImageProps): ReactElement => <Image src={Menu} {...props} />;

export { HeroImage };
export { UniformImage };
export { UniformImage1 };
export { UniformImage2 };
export { UniformImage3 };
export { UniformImage4 };
export { TokenLogoImage };
export { MetamaskLogoImage };
export { ParibuLogoImage };
