import { useCallback, useEffect, useState } from "react";

interface TimeLeftInterface {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
	status: "loading" | "success" | "undefined";
}

const timeLeftInitialValue: TimeLeftInterface = {
	days: "",
	hours: "",
	minutes: "",
	seconds: "",
	status: "loading",
};

export const useCountdownTimer = (date: string): TimeLeftInterface => {
	const getObj = useCallback((): TimeLeftInterface => {
		let difference = +new Date(date).getTime() - +new Date().getTime();
		if (difference < 0) {
			return {
				...timeLeftInitialValue,
				status: "undefined",
			};
		}
		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24))
				.toString()
				.padStart(2, "0"),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
				.toString()
				.padStart(2, "0"),
			minutes: Math.floor((difference / 1000 / 60) % 60)
				.toString()
				.padStart(2, "0"),
			seconds: Math.floor((difference / 1000) % 60)
				.toString()
				.padStart(2, "0"),
			status: "success",
		};
	}, [date]);

	const [timeLeft, setTimeLeft] = useState<TimeLeftInterface>(() => getObj());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(getObj());
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [timeLeft]);

	return timeLeft;
};
