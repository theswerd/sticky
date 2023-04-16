<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  import { storage } from "../storage";

  export let count: number;

  let successMessage: string = null;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function scream() {
    navigator.clipboard.write([
        new ClipboardItem({
            'image/png': imgData.split(';')[1]
        })
    ]);
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
    chrome.storage.local.get().then((res)=>{
        imgData = res.cutout
    })

    chrome.storage.onChanged.addListener((changes)=>{
        if("cutout" in changes){
            imgData = changes.cutout.newValue;
        }
    })
  });
</script>

<div class="w-64 h-64 bg-light-blue-800">
  <nav
    class="w-64 h-10 p-2 flex flex-row bg-gradient-to-l
            from-sky-blue-start to-teal-stop align-middle"
  >
    <logo
      class="aspect-square flex bg-banner_icon bg-no-repeat bg-contain grow-0"
    />
    <div class="flex align-middle">
      <p
        class="pl-2 font-sans text-2xl text-left align-middle items-center text-white"
      >
        Stickie
      </p>
    </div>
  </nav>

  <sticker class="w-64 h-64 bg-slate-400 flex">
    <p class="text-l text-white flex-1 text-center align-baseline">
      Your Sticker
    </p>
    {#if imgData}
    <img src={imgData} alt="sticker"/>
   {/if}
  </sticker>
 

  <copy>
    <button
      on:click={scream}
      class="w-64 h-10 bg-button_blue text-white flex-1
        align-bottom font-sans font-bold">Drag Sticker</button
    >
  </copy>
</div>
