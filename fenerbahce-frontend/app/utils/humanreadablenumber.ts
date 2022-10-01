export function humanReadableNumber(number: number) {
	return Number(new Intl.NumberFormat("en-US").format(number));
}
