<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  import { fade, slide } from "svelte/transition";

  let historyOpen = false;
  let past: string[] = [];
  let successMessage: string = null;
  function scream() {
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": imgData.split(";")[1],
      }),
    ]);
  }

  $: {
    if (historyOpen) {
      chrome.storage.local.get().then((res) => {
        past = res.past;
      });
    }
  }

  function save() {
    // storage.set({ cuttout }).then(() => {
    //   successMessage = "Options saved!";
    //   setTimeout(() => {
    //     successMessage = null;
    //   }, 1500);
    // });
  }
  let imgData: string;
  onMount(() => {
    chrome.storage.local.get().then((res) => {
      imgData = res.cutout;
    });

    chrome.storage.onChanged.addListener(async (changes) => {
      if ("cutout" in changes && !("past" in changes)) {
        imgData = changes.cutout.newValue;
        if (changes.cutout.oldValue) {
          console.log("Adding to history");
          const data = await chrome.storage.local.get();
          if (data.past == null) {
            data.past = ["WHAT THE FUCK"];
          }
          chrome.storage.local.set({
            past: [changes.cutout.oldValue, ...data.past].slice(0,40),
          });
          past = [changes.cutout.oldValue, ...data.past].slice(0,40);
        } else {
          console.log("HISTORICAL");
        }
      }
    });
  });
</script>

<div
  class="bg-light-blue-800 transition-all"
  class:h-64={!historyOpen}
  class:w-64={!historyOpen}
  class:w-96={historyOpen}
  class:h-96={historyOpen}
>
  <nav
    class="w-full h-10 p-2 flex flex-row bg-gradient-to-l
            from-sky-blue-start to-teal-stop align-middle justify-between"
  >
    <logo
      class="aspect-square flex bg-banner_icon bg-no-repeat bg-contain grow-0"
    />
    <button
      class="h-full rounded-md p-1 flex items-center justify-center bg-cyan-700 transition-all hover:bg-cyan-800 text-white cursor-pointer"
      on:click={() => {
        historyOpen = !historyOpen;
      }}
    >
      {historyOpen ? "Mini" : "History"}
    </button>
  </nav>
  <div
    class:grid={historyOpen}
    class:gap-4={historyOpen}
    class:p-4={historyOpen}
    class="grid-cols-2 bg-slate-400 h-full overflow-scroll"
  >
    <sticker class="w-full aspect-square flex">
      {#if imgData}
        <img src={imgData} alt="sticker" />
      {:else}
        <p class="text-l text-white flex-1 text-center align-baseline">
          Your Sticker
        </p>
      {/if}
    </sticker>
    {#if historyOpen && past}
      {#each past as pastCutout (pastCutout)}
        <sticker class="w-full aspect-square flex relative" transition:fade>
        <button class=" absolute top-2 right-2 rounded-full p-1 aspect-square bg-gray-500 h-8 bg-opacity-50 hover:bg-opacity-75 text-white" on:click={()=>{
            chrome.storage.local.set({
                past: past.filter((image)=>(image != pastCutout))
            })
            past = past.filter((image)=>(image != pastCutout))
        }}>x</button>
          <img src={pastCutout} alt="sticker" />
        </sticker>
      {/each}
    {/if}
  </div>
  <copy>
    <div
      class="w-full h-10 bg-button_blue text-white flex-1
        align-bottom font-sans font-bold text-center"
    >
      Drag Sticker{historyOpen ? "s" : ""}
    </div>
  </copy>
 
   
</div>
