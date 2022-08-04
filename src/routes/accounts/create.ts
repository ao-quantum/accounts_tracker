import { prisma } from "$lib/prisma";
import { Currency } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    const currencies = Object.values(Currency);

    return {
        body: {
            currencies,
        }
    }
}

export const POST: RequestHandler = async ({request}) => {
    const input = await request.text()
    const body = new URLSearchParams(input);

    const name = body.get('name');
    const currencyStr = body.get('currency');

    if (!name || !currencyStr) {
        return {
            status: 400,
            body: {
                error: 'Missing required fields',
            }
        }
    }

    const currency = Object.values(Currency).find(x => x === currencyStr);

    if (!currency) {
        return {
            status: 400,
            body: {
                error: 'Invalid currency',
            }
        }
    }

    await prisma.account.create({
        data: {
            name,
            currency,
        }
    })

    return {
        headers: {
            Location: '/accounts',
        },
        status: 302,
    };
}
