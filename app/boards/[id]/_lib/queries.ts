import { prisma } from "@lib/workloads/app-db";

export async function boardData(boardId: number, accountId: string) {
	return prisma.board.findUnique({
		where: {
			id: boardId,
			accountId: accountId,
		},
		include: {
			columns: { orderBy: { order: "asc" }, include: { items: true } },
		},
	});
}
