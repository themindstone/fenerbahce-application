export const getTokens = () => {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");

	return {
		accessToken,
		refreshToken,
	};
};
