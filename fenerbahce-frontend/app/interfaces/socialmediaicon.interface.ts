import type { ReactElement } from "react";

export interface ISocialMediaIcon {
	title: string;
	link: string;
	Icon: () => ReactElement;
	key: string;
}
