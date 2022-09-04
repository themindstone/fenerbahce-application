import React, { useEffect, useState } from "react";

interface TimeLeftInterface {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
}

const timeLeftInitialValue: TimeLeftInterface = {
	days: "",
	hours: "",
	minutes: "",
	seconds: "",
};

export const useCountdownTimer = (date: string): TimeLeftInterface => {
	const [timeLeft, setTimeLeft] = useState<TimeLeftInterface>(timeLeftInitialValue);

    useEffect(() => {
        const timer = setTimeout(() => {
            let difference = +new Date(date) - +new Date();
            let timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, "0"),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, "0"),
                minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, "0"),
                seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, "0"),
            };
            setTimeLeft(timeLeft);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    });


    return timeLeft;
};
