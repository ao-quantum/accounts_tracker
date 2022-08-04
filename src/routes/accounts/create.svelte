<script lang="ts">
    export let currencies: string[];
</script>

<form action="/accounts/create" method="post">
    <input type="text" name="name" placeholder="Name">
    <select name="currency" id="currency">
        {#each currencies as currency}
            <option value="{currency}">{currency}</option>
        {/each}
    </select>
    <button type="submit">Create</button>
</form>