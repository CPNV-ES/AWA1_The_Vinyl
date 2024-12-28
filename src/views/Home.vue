<script setup>
import VinylPlayer from '../components/graphicComponents/VinylPlayer.vue';
import SearchBar from '../components/SearchBar.vue';
import VinylCoverQueue from '../components/graphicComponents/VinylCoverQueue.vue';
import SongPreview from '../components/SongPreview.vue';
import { VinylPlayer as VP } from '../lib/VinylPlayer';

const player = new VP();
</script>

<template>
    <nav class="justify-between flex gap-4">
        <SearchBar @onPick:song="player.addToQueue($event)" />
        <button name="logout" class="button-spotify px-3 py-1"><b>Logout</b></button>
    </nav>
    <div class="grow flex flex-col lg:flex-row perspective-1600">
        <section class="flex justify-center items-center h-full w-[50dvw] px-[5dvh] relative">
            <h1 class="absolute top-0 left-[2dvh] text-2xl font-pacifico uppercase font-bold">Current songs</h1>
            <div class="h-[15dvh] w-[15dvh] absolute top-20 left-[10dvh]">
                <SongPreview v-if="player.queue.value[0]" :preview="player.queue.value[0]" />
            </div>
            <VinylPlayer :player="player" />
        </section>
        <section class="flex items-center h-full w-[50dvw] px-[5dvh] relative">
            <h1 class="absolute top-0 left-[2dvh] text-2xl font-pacifico uppercase font-bold">Next songs</h1>
            <VinylCoverQueue :queue="player.queue.value" />
        </section>
    </div>
</template>

<script>
export default { name: 'Home' };
</script>