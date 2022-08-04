import { prisma } from "$lib/prisma";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request, params}) => {
    const accountId = parseInt(params.id);
    const input = await request.text();
    const body = new URLSearchParams(input);

    const description = body.get('description');
    const amountStr = body.get('amount');

    if (!amountStr || typeof accountId !== 'number') {
        return {
            status: 400,
            body: {
                error: 'Missing required fields',
            }
        }
    }

    if (!parseFloat(amountStr)) {
        return {
            status: 400,
            body: {
                error: 'Invalid amount',
            }
        }
    }

    const amount = parseFloat(amountStr)

    await prisma.transaction.create({
        data: {
            description,
            accountId,
            amount,
            type: amount >= 0 ? 'credit' : 'debit',
        }
    })

    await prisma.account.update({
        where: {
            id: accountId,
        },
        data: {
            balance: {
                increment: amount,
            }
        }
    })

    return {
        headers: {
            Location: `/accounts/${accountId}`,
        },
        status: 302,
    };
}