import { remember } from "@epic-web/remember";
import { Redis } from "@monolayer/workloads";
import { createClient } from "redis";

export const tokens = new Redis("tokens", (envVarName) =>
	remember("tokens", async () =>
		createClient({
			url: process.env[envVarName],
		})
			.on("error", (err) => console.error("Redis Client Error", err))
			.connect(),
	),
);

const tokensKV = await tokens.client;

export { tokensKV };
