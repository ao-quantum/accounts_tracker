import { prisma } from "$lib/prisma";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({params}) => {
    const id = params.id;

    const account = await prisma.account.findUnique({
        where: { id: parseInt(id), }
    });

    if (!account) {
        return {
            status: 404,
            body: {
                error: 'Account not found',
            },
        }
    }

    const transactions = await prisma.transaction.findMany({
        where: {
            accountId: account.id,
        },
    });

    return {
        body: {
            account,
            transactions,
        }
    };
}