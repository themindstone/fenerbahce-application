import type { ReactElement, SVGProps } from "react";
import { Image } from "@chakra-ui/react";
import type { ImageProps } from "@chakra-ui/react";
import Telegram from "~/assets/icons/telegram.svg";
import Facebook from "~/assets/icons/facebook.svg";
import Instagram from "~/assets/icons/instagram.svg";
import Twitter from "~/assets/icons/twitter.svg";
import LinkedIn from "~/assets/icons/linkedin.svg";
import User from "~/assets/icons/user-icon.svg";
import Close from "~/assets/icons/close-icon.svg";
import Copy from "~/assets/icons/copy-icon.svg";
import ViewEtherscan from "~/assets/icons/view-etherscan.svg";
import Menu from "~/assets/icons/menu-icon.svg";
import SliderImage from "~/assets/images/slider.jpeg";

import HeroImage from "./images/Hero.png";
import JorgeJesusBanner from "./images/jorge-jesus-banner.png";
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
export const LinkedInIcon = (props: ImageProps): ReactElement => <Image src={LinkedIn} {...props} />;

// export const UserIcon = (props: ImageProps): ReactElement => <Image src={User} {...props} />;
export const UserIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><g clipPath="url(#clip0_30_260)"><path d="M13.4286 5.06394C13.4286 6.47802 12.8689 7.75694 11.9664 8.6753C11.084 9.57376 9.87378 10.1279 8.5386 10.1279C7.19397 10.1279 5.97605 9.56587 5.09205 8.65609C4.20052 7.73892 3.64862 6.46824 3.64862 5.06394C3.64862 2.26717 5.83791 0 8.5386 0C11.2393 0 13.4286 2.26752 13.4286 5.06394Z" fill={props.fill || "#1B2F6E"}/><path d="M17 15.1867C14.6171 16.9573 11.6953 17.9997 8.53857 17.9997C5.3476 17.9997 2.39697 16.9344 6.10352e-05 15.1288C0.130913 11.904 1.9886 9.78849 4.655 8.80469C4.69851 8.85323 4.74287 8.90089 4.78809 8.94766C5.27163 9.4487 5.84406 9.84833 6.47393 10.1246C7.2868 10.4809 8.17275 10.6211 9.05128 10.5327C9.92981 10.4442 10.7731 10.1298 11.5044 9.61808C11.786 9.421 12.0488 9.19651 12.2891 8.94766C12.3274 8.90803 12.3651 8.86775 12.4021 8.82681C15.0526 9.82605 16.8899 11.9531 17 15.1867Z" fill={props.fill || "#1B2F6E"}/></g><defs><clipPath id="clip0_30_260"><rect width="17" height="18" fill="white"/></clipPath></defs></svg>;
export const CloseIcon = (props: ImageProps): ReactElement => <Image src={Close} {...props} />;
export const CopyIcon = (props: ImageProps): ReactElement => <Image src={Copy} {...props} />;
export const ViewEtherscanIcon = (props: ImageProps): ReactElement => <Image src={ViewEtherscan} {...props} />;
export const ArrowForwardIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
export const ArrowBackIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;
export const PlusIcon = (props: SVGProps<SVGSVGElement>): ReactElement => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24" {...props}><path d="M40 128h176"/><path d="M128 40v176"/></svg>;
export const MenuIcon = (props: ImageProps): ReactElement => <Image src={Menu} {...props} />;

export { HeroImage };
export { JorgeJesusBanner };
export { UniformImage };
export { UniformImage1 };
export { UniformImage2 };
export { UniformImage3 };
export { UniformImage4 };
export { TokenLogoImage };
export { MetamaskLogoImage };
export { ParibuLogoImage };
export { SliderImage };
