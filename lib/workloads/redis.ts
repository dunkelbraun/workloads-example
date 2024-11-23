import { Redis } from "@monolayer/workloads";
import { Redis as IORedis} from "ioredis";

export const tokensKV = new Redis("tokens", (envVarName) =>
	new IORedis(process.env[envVarName]!)
);
