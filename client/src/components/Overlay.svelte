<script lang="ts">
  import { fade } from "svelte/transition";
  import "../app.css";
  import { onMount } from "svelte";

  let loading = true;
  let cutout: string;
  // onMount(() => {
  //     alert("MOUNTEDDD")
  //     storage.get().then((storage) => (count = storage.count));
  // });
  export let pos: {
    x: number;
    y: number;
  };
  export let img: HTMLImageElement;
  onMount(() => {
    try {
      // get img data
      const canvas = document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      const dataURL = canvas.toDataURL("image/png");

      fetch("http://127.0.0.1:5000", {
        method: "POST",
        body: JSON.stringify({
          image: dataURL,
          positionX: pos.x,
          positionY: pos.y,
        }),
        headers: {
          "Content-Type": "application/json",
        //   cors
         "mode": "cors"
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);

          cutout = data.image;
          loading = false;
        });
    } catch (e) {
      console.log(e);
    }
  });
  let fadeIn = false;
  onMount(() => {
    setTimeout(() => {
      fadeIn = true;
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
  {#if cutout}

      <img src={cutout} alt="cutout" transition:fade class="absolute left-0 z-[100] "/>

  {/if}
{/if}

<style>
  * {
    font-family: "Courier New", Courier, monospace;
  }
</style>
