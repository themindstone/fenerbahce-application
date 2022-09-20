interface ENV {
	BACKEND_URL: string | undefined;
	NODE_ENV: string;
}

interface Config {
	BACKEND_URL: string;
	NODE_ENV: string;
}

const getEnv = (): ENV => {
	return {
		BACKEND_URL: process.env.BACKEND_URL,
		NODE_ENV: process.env.NODE_ENV
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
