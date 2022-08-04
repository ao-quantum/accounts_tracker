<script lang="ts">
import type { Account, Currency, Transaction } from "@prisma/client";


    export let account: {
        id: number;
        name: string;
        balance: number;
        currency: Currency;
    };
    export let transactions: Transaction[];
</script>

<h1>Account {account.name}</h1>
<p>Balance: {account.balance}</p>


<h2>Transactions</h2>
<a href="/accounts/{account.id}/transactions/create">Create a transaction</a>
<br />
{#if !transactions.length}
    <p>No transactions for this account</p>
{:else}
    {#each transactions as transaction}
        <ul>
            <li>
                {transaction.amount} {account.currency.toString()} - Created at {new Date(transaction.createdAt).toUTCString()}
                <br />
                {#if transaction.description}
                    Description: <em>{transaction.description}</em>
                {/if}
            </li>
        </ul>
    {/each}
{/if}
