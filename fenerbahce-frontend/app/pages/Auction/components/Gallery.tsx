import { Box, Flex } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import { ReactElement } from "react";
import { Slideshow } from "~/components";

const options = {
	loop: false,
    items: 1,
    slideBy: 1,
};

const GalleryThumbnail = () => {
};

const GalleryItem = (): ReactElement => {

    return <Flex borderRadius="15px"
                overflow="hidden"
                bg="var(--governor-bay)"
                direction="column" style={{ aspectRatio: "1" }}>
                    nernbaaasdfas
                </Flex>
};

export const Gallery = (): ReactElement => {

    const { auction: { photoUrls } } = useLoaderData();

    const _photoUrls = photoUrls.map((item: string) => {
        return {
            original: item,
            thumbnail: item,
        };
    });

    return <Box overflow="hidden">
        <Slideshow options={options} images={_photoUrls} />
    </Box>
};
