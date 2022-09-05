import { Flex, Heading, Input } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { Fragment, useMemo, useState } from "react";
import { Footer, GoldenFizzButton, Header } from "~/components";

export const Admin = () => {

    const [productPhotosInputCount, setProductPhotosInputCount] = useState<number>(1);

    const increase = () => {
        setProductPhotosInputCount(productPhotosInputCount + 1);
    };

    const decrease = () => {
        if (productPhotosInputCount === 1) {
            return;
        }
        setProductPhotosInputCount(productPhotosInputCount - 1);
    };

    const arr = useMemo(() => Array(productPhotosInputCount).fill(0).map((item, index) => {
        return index + 1
    }), [productPhotosInputCount]);

    return (<Fragment>
        <Header />
        <Form method="post">
            <Flex direction="column" gap="15px" padding="40px">
                <Heading>Urun ekle</Heading>
                <Input type="hidden" name="_method" value="add_product" />
                <Input name="username" value="fb-admin" />
                <Input name="password" value="fb-admin" />
                <Input placeholder="urun adi" name="name" defaultValue="enesince 2. imzali forma" />
                <Flex gap="20px" alignSelf="stretch">
                    <Flex direction="column" gap="15px" flexGrow="1">
                        {arr.map(item => {
                            return <Input placeholder="urun fotograflari" name={`photoUrls[]`} key={`product-photos-${item}`} />
                        })}
                    </Flex>
                    <Flex gap="10px">
                        <GoldenFizzButton onClick={increase}>Plus</GoldenFizzButton>
                        <GoldenFizzButton onClick={decrease}>Minus</GoldenFizzButton>
                    </Flex>
                </Flex>
                <Input placeholder="urun baslangic fiyat" name="auctionStartPrice" />
                <Input placeholder="urun hemen al fiyat" name="auctionImmediatePrice" />
                <Input placeholder="baslangic tarih (ay-gun-yil)" name="startDate" />
                <Input placeholder="bitis tarih (ay-gun-yil)" name="endDate" />
                <GoldenFizzButton alignSelf="start" type="submit">Ekle</GoldenFizzButton>
            </Flex>
        </Form>
        <Footer />
    </Fragment>);
};
