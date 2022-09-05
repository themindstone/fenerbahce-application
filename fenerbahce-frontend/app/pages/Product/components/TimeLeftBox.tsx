import { VStack, Text } from "@chakra-ui/react";

export const TimeLeftBox = (props: { text: string; left: string }) => {
	return (
		<VStack bg="var(--governor-bay)" w="120px" h="120px" borderRadius="20px" justifyContent="center">
			<Text fontWeight="bold" fontSize="70px" lineHeight="50px">
				{props.left}
			</Text>
			<Text fontSize="14px" color="rgba(255, 255, 255, 0.8)">
				{props.text}
			</Text>
		</VStack>
	);
};
