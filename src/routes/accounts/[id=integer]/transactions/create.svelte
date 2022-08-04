<script lang="ts">
    export let error: string;
</script>

{#if error}
    <p>Error: {error}</p>
{/if}
<form action="./create" method="post">
    <input type="number" name="amount" placeholder="Amount">
    <input type="text" name="description" placeholder="Description">
    <button type="submit">Create</button>
</form>
