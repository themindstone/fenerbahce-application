import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
	name: yup.string().required("İsim bilgisi zorunludur"),
	startPrice: yup
		.number()
		.typeError("Başlangıç fiyatı sayı olmalıdır")
		.required("Başlangıç fiyatı zorunludur.")
		.when("buyNowPrice", (buyNowPrice: number, schema: any) =>
			schema.max(buyNowPrice, "Başlangıç fiyatı bitiş fiyatından büyük olamaz."),
		),
	bidIncrement: yup
		.number()
		.typeError("Artış miktarı sayı olmalıdır")
		.required("Artış miktarı zorunludur.")
		.when(["startPrice"], (startPrice: any, schema: any) =>
			schema.max(startPrice, "Artış miktarı başlangıç fiyatından büyük olamaz."),
		),
	buyNowPrice: yup.number().typeError("Satın al fiyatı sayı olmalıdır").required("Satın al fiyatı zorunludur."),
	startDate: yup
		.date()
		.typeError("Başlangıç tarihi geçerli bir tarih olmalıdır")
		.required("Başlangıç tarihi zorunludur.")
		.when([], (schema: any) => schema.min(new Date(), "Başlangıç tarihi bugünden ileri olmalıdır."))
		.when(["endDate"], (endDate: Date, schema: any) =>
			schema.max(endDate, "Başlangıç tarihi bitiş tarihinden önce olmalıdır."),
		),
	endDate: yup.date().typeError("Bitiş tarihi geçerli bir tarih olmalıdır").required("Bitiş tarihi zorunludur."),
	photoUrls: yup
		.array()
		.of(
			yup.object({
				photoUrl: yup
					.string()
					.url("Fotoğraf için geçerli bir url girmeniz gerekiyor")
					.required("Fotoğraf url'si zorunludur."),
			}),
		)
		.required("Fotoğraf url'si zorunludur"),
});

export type CreateAuctionFormType = yup.InferType<typeof schema>;

export const useCreateAuctionForm = () => {
	const form = useForm<CreateAuctionFormType>({
		mode: "onBlur",
		resolver: yupResolver(schema),
	});

	return form;
};
