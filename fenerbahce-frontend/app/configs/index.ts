type NODE_ENV_TYPE = "development" | "test" | "production";

interface ENV {
	BACKEND_URL: string | undefined;
	NODE_ENV: NODE_ENV_TYPE;
}

export interface Config {
	BACKEND_URL: string;
	NODE_ENV: NODE_ENV_TYPE;
}

const getEnv = (): ENV => {
	return {
		BACKEND_URL: process.env.BACKEND_URL,
		NODE_ENV: process.env.NODE_ENV as NODE_ENV_TYPE
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
