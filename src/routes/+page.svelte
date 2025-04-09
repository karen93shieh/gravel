<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { page } from "$app/state";

    

</script>
<style>

</style>

<main>
    <h1>Welcome to Gravel</h1>
    <button on:click={goto("/login")}>Login</button>


</main>


<!-- <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p> -->

