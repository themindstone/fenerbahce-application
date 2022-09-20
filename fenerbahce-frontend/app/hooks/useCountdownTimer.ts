import React, { useEffect, useState } from "react";

interface TimeLeftInterface {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
    status: "loading" | "success" | "undefined"
}

const timeLeftInitialValue: TimeLeftInterface = {
	days: "",
	hours: "",
	minutes: "",
	seconds: "",
    status: "loading"
};

export const useCountdownTimer = (date: string): TimeLeftInterface => {
	const [timeLeft, setTimeLeft] = useState<TimeLeftInterface>(timeLeftInitialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            let difference = +new Date(date) - +new Date();
            if (difference < 0) {
                setTimeLeft((prev) => ({
                    ...prev,
                    status: "undefined"
                }));
                return;
            }
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, "0"),
                minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
                seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
                status: "success",
            });
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [timeLeft]);


    return timeLeft;
};
