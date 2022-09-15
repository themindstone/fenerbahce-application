interface ENV {
	BACKEND_URL: string | undefined;
}

interface Config {
	BACKEND_URL: string;
}

const getEnv = (): ENV => {
	return {
		BACKEND_URL: process.env.BACKEND_URL,
	};
};

const getConfig = (env: ENV): Config => {
	for (const [key, value] of Object.entries(env)) {
		if (value === undefined) {
			throw new Error(`${key} must exist in env file`);
		}
	}

	return env as Config;
};

export const config = getConfig(getEnv());
