<script lang="ts">
    import '../app.css'
    import { storage } from "../storage";

    export let count: number;
    
    let successMessage: string = null;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }

    function save() {
        storage.set({ count }).then(() => {
            successMessage = "Options saved!";

            setTimeout(() => {
                successMessage = null;
            }, 1500);
        });
    }
</script>

<div class="w-64 h-64">
    <p>Current counting: <b>{count}</b></p>
    <div>
        <button on:click={decrement} class="bg-red-500">-</button>
        <button on:click={increment}>+</button>
        <button on:click={save}>Save</button>
        {#if successMessage}<span class="success">{successMessage}</span>{/if}
    </div>
</div>

