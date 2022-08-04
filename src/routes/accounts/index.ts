import type { RequestHandler } from "@sveltejs/kit";
import { prisma } from "$lib/prisma";
 
export const GET: RequestHandler = async () => {
    const accs = await prisma.account.findMany();

    return {
        body: {
            accounts: accs
        },
    };
}