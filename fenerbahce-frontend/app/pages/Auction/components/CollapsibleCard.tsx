import type { ReactElement } from "react";
import useCollapse from "react-collapsed";
import { PlusIcon } from "~/assets";
import { Flex, Text, Box } from "@chakra-ui/react";

interface CollapsibleCardInterface {
	title: string;
	children: React.ReactNode;
}

export const CollapsibleCard = ({ title, children }: CollapsibleCardInterface): ReactElement => {
	const { getCollapseProps, getToggleProps } = useCollapse();

	return (
		<Flex direction="column" gap="10px">
			<Flex
				{...getToggleProps()}
				alignItems="center"
				borderRadius="5px"
				border="1px solid #CACEDB"
				p="10px"
				justifyContent="space-between">
				<Text>{title}</Text>
				<Text>
					{/* {isExpanded ? 'Collapse' : 'Expand'} */}
					<PlusIcon height="20px" width="24px" />
				</Text>
			</Flex>
			<Box {...getCollapseProps()}>
				<Box borderRadius="5px" border="1px solid #CACEDB" p="10px">
					{children}
				</Box>
			</Box>
		</Flex>
	);
};
