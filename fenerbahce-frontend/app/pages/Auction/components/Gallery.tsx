import { Box, useMediaQuery } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import { ReactElement } from "react";
import { Slideshow } from "~/components";

const options = {
	loop: false,
    items: 1,
    slideBy: 1,
};

// const GalleryThumbnail = () => {
// };

// const GalleryItem = (): ReactElement => {

//     return <Flex borderRadius="15px"
//                 overflow="hidden"
//                 bg="var(--governor-bay)"
//                 direction="column" style={{ aspectRatio: "1" }}>
//                     nernbaaasdfas
//                 </Flex>
// };

export const Gallery = (): ReactElement => {

	const [md] = useMediaQuery("(max-width: 900px)");
    const { auction: { photoUrls } } = useLoaderData();

    const _photoUrls = photoUrls.map((item: { photoUrl: string }) => {
        return {
            original: item.photoUrl,
            thumbnail: item.photoUrl,
        };
    });

    return <Box overflow="hidden" maxW={md && "400px" || "unset"}>
        <Slideshow options={options} images={_photoUrls} />
    </Box>
};
