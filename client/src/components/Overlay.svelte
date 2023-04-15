<script lang="ts">
    import { storage } from "src/storage";
    import { onMount } from "svelte";
    import Options from "./Options.svelte";
    let count = 0;

    onMount(() => {
        storage.get().then((storage) => (count = storage.count));
    });
</script>

<div class="overlay">
    <Options {count} />
</div>
