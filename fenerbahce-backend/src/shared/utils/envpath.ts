type NodeEnv = "development" | "local" | "production";

const envs = {
    development: "config/.env.development",
    local: "config/.env.local",
    production: "config/.env",
};

const getNodeEnv = (): NodeEnv => {
    if (!process.env.NODE_ENV) {
        throw new Error("NODE_ENV must be set");
    }
    if (typeof process.env.NODE_ENV === "string") {
        if (
            ["development", "local", "production"].includes(
                process.env.NODE_ENV,
            )
        ) {
            return process.env.NODE_ENV as NodeEnv;
        } else {
            throw new Error("This type of NODE_ENV variable does not exist");
        }
    }
    throw new Error("NODE_ENV is not a string");
};

const getEnvPath = (): string => {
    const env_path: NodeEnv = getNodeEnv();

    if (!envs[env_path]) {
        return "config/env.development";
    }
    return envs[env_path];
};

export const envPath = getEnvPath();
