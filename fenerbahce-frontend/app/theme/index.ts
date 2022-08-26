import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: "var(--lucky-point)",
				color: "white",
			},
		},
	},
	fonts: {
		heading: `'Cairo', sans-serif`,
		body: `'Cairo', sans-serif`
	}
});
