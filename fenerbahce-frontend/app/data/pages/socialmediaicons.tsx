import { InstagramIcon, LinkedInIcon, TelegramIcon, TwitterIcon } from "~/assets";
import type { ISocialMediaIcon } from "~/interfaces";

export const socialmediaicons: ISocialMediaIcon[] = [
	{
		title: "Twitter",
		link: "https://twitter.com/fbtokenofficial/",
		Icon: () => <TwitterIcon />,
		key: "25b04da2-3d50-450a-9001-ab3793270ca4",
	},
	{
		title: "Telegram",
		link: "https://t.me/fbtokenofficial",
		Icon: () => <TelegramIcon />,
		key: "ae5544d7-1660-4d0a-b7e7-bb72ae2861ac",
	},
	{
		title: "LinkedIn",
		link: "https://www.linkedin.com/company/fbtokenofficial/",
		Icon: () => <LinkedInIcon />,
		key: "a222946a-20dc-11ed-861d-0242ac120002",
	},
	{
		title: "Instagram",
		link: "https://www.instagram.com/fbtokenofficial/",
		Icon: () => <InstagramIcon />,
		key: "b56f121e-20dc-11ed-861d-0242ac120002",
	},
];
