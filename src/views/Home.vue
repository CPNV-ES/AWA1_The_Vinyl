<script setup>
import VinylPlayer from '../components/graphicComponents/VinylPlayer.vue';
import SearchBar from '../components/SearchBar.vue';
import VinylCover from '../components/graphicComponents/VinylCover.vue';
import { VinylPlayer as VP } from '../lib/VinylPlayer';
import { Song } from '../lib/Song';

const player = new VP();
</script>

<template>
    <nav class="justify-between flex gap-4">
        <SearchBar @onPick:song="player.addToQueue($event)" />
        <button name="logout" class="button-spotify px-3 py-1"><b>Logout</b></button>
    </nav>
    <div class="grow flex flex-col lg:flex-row">
        <section class="flex justify-center items-center h-full w-[50dvw]">
            <VinylPlayer :player="player" />
        </section>
        <section class="flex justify-center items-center h-full w-[50dvw]">
            <VinylCover v-for="song in player.queue.value" :key="song.id" :song="song" />
        </section>
    </div>
</template>

<script>
export default { name: 'Home' };
</script>