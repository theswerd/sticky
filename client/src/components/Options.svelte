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

    function scream()
    {
        alert("scream");
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

<div class="w-64 h-64 bg-light-blue-800">
    <nav class="w-64 h-10 p-2 flex flex-row bg-gradient-to-l 
            from-sky-blue-start to-teal-stop align-middle">
        <logo class="aspect-square flex bg-banner_icon bg-no-repeat bg-contain grow-0"/>
        <div class="flex align-middle">
            <p class='pl-2 font-sans text-2xl text-left align-middle items-center text-white'>Stickie</p>
        </div>
    </nav>

    <sticker class="w-64 h-64 bg-slate-400 flex">
        <p class="text-l text-white flex-1 text-center align-baseline">Your Sticker</p>
    </sticker>

    <copy>
        <button on:click={scream} class="w-64 h-10 bg-button_blue text-white flex-1 
        align-bottom font-sans font-bold">Copy sticker</button>
    </copy>
</div>
