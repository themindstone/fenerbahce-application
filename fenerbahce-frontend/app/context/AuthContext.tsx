import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuthClient } from "~/client";

interface AuthContextInterface {
	status: "idle" | "loggedIn" | "loggedOut";
	signIn: (params: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderProps {
	children: React.ReactNode;
	authenticationRequired: boolean;
}

const AuthContext = React.createContext<AuthContextInterface>({
	status: "idle",
	signIn: async () => {},
	logout: async () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
	const [status, setStatus] = useState<"idle" | "loggedIn" | "loggedOut">("idle");

	const authClient = useAuthClient();

	useQuery(["me"], () => authClient.getAuthUser(), {
		onSuccess: () => {
			window.location.pathname === "/login" ? (window.location.href = "/admin") : setStatus("loggedIn");
		},
		onError: () => {
			window.location.pathname !== "/login" ? (window.location.href = "/login") : setStatus("loggedOut");
		},
		retry: 2,
		retryDelay: 500,
	});

	const signIn = async (params: { email: string; password: string }) => {
		const { accessToken, refreshToken } = await authClient.login(params);
		if (!accessToken || !refreshToken) {
			throw new Error("Invalid credentials");
		}
		localStorage.accessToken = accessToken;
		localStorage.refreshToken = refreshToken;
		setStatus("loggedIn");
	};

	const logout = async () => {
		await authClient.logout();
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		setStatus("loggedOut");
	};

	const value = { status, signIn, logout };

	return <AuthContext.Provider value={value}>{status === "idle" ? "loading" : props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuthContext must be used within a AuthProvider");
	}
	return context;
};
