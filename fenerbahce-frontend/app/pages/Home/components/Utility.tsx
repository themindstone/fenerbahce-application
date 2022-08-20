import { Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Carousel} from "~/components";


interface UtilityCardProps {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
}


const options = {
    items: 4,
    autoWidth: true,
    loop: true,
    margin: 30,
};


const dummyData: Omit<UtilityCardProps, "id"> = {
    title: "Locada mac keyfi",
    category: "Basketbol",
    imageUrl: "https://img.fanatik.com.tr/img/78/740x418/62dcfaafae298b9e8e0cfeb0.jpg",
};

const dummyDatas: UtilityCardProps[] = Array(15).fill(dummyData).map(i => {
    i.id = Math.random();
    return i;
});


function UtilityCard({ utilityData }: { utilityData: UtilityCardProps }): ReactElement {


    return (<Flex w="280px" height="350px"
        bgImage={`url(${utilityData.imageUrl})`}
        bgPos="center"
        bgSize="cover"
        borderRadius="10px"
        boxShadow="inset 0 0 150px #000000"
        pos="relative"
    >
        <Flex pos="absolute" gap="5px" top="240px" direction="column" p="20px">
            <Text fontWeight="bold" color="var(--golden-fizz)">{utilityData.category}</Text>
            <Heading size="md">{utilityData.title}</Heading>
        </Flex>
    </Flex>);

}

export const Utility = (): ReactElement => {


    return (<Flex direction="column" gap="50px" alignItems="center" className="utility-container">
        <Heading>Fenerbahce Token Faydalari</Heading>
        <Carousel options={options}>

            {dummyDatas.map(item => {
    
            return <UtilityCard utilityData={item} key={item.id} />
    
            })}
        </Carousel>
            
    </Flex>)
};