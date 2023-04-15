<script lang="ts">
  import { fade } from "svelte/transition";
  import "../app.css";
  import { onMount } from "svelte";
  let count = 0;

  let loading = true;

  // onMount(() => {
  //     alert("MOUNTEDDD")
  //     storage.get().then((storage) => (count = storage.count));
  // });
  let fadeIn = false
  onMount(() => {
    setTimeout(() => {
      fadeIn = true
    }, 1);
  });
</script>
{#if fadeIn}
<div
  class=" w-full h-full backdrop-blur-sm backdrop-grayscale backdrop-brightness-50 z-10 absolute top-0 flex items-center justify-center flex-col"
  transition:fade
>
  {#if loading}
      <div
        class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"
      />
      <div class="text-2xl font-bold text-white">Loading...</div>
  {/if}
</div>
{/if}
<style>
   *{
        font-family: 'Courier New', Courier, monospace;
        }
</style>