<script lang="ts">
    export let accounts: any[];
</script>

<style>
    ul {
        list-style: none;
    }
</style>

<h1>Your accounts</h1>
<ul>
    {#each accounts as account}
        <li>
            <a href="/accounts/{account.id}">{account.name}</a> - <em>{account.balance} {account.currency}</em>
        </li>
    {/each}
</ul>
