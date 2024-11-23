import { remember } from "@epic-web/remember";
import { PostgresDatabase } from "@monolayer/workloads";
import { PrismaClient } from "@prisma/client";

export const appDb = new PostgresDatabase("trellex", {
	client: () => remember("prisma", () => new PrismaClient()),
});

process.on("beforeExit", () => {
	appDb.client.$disconnect();
});

const prisma = appDb.client;

export { prisma };
