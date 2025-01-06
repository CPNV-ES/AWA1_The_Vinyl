<script setup>
import { PlayIcon } from '@heroicons/vue/24/solid';
import { Song } from '../lib/Song';
</script>

<template>
    <div class="flex-grow flex items-center gap-2 relative p-2 hover:bg-neutral-700 group/song-banner">
        <div class="relative h-12 w-12 rounded-md overflow-hidden">
            <div
                class="group-hover/song-banner:flex hidden bg-black bg-opacity-70 absolute h-full w-full justify-center items-center">
                <PlayIcon class="h-2/5 w-2/5" />
            </div>
            <img :src="song.cover" alt="" class="h-full w-full" />
        </div>
        <p class="flex flex-col items-start text-white">
            <span>{{ song.title }}</span>
            <span class="text-neutral-300 text-xs">{{ song.artist }}</span>
        </p>
        <span class="absolute right-6 text-3xl text-transparent group-hover/song-banner:text-white">+</span>
    </div>
</template>


<script>
export default {
    name: 'SongBanner',
    props: {
        song: {
            type: Song,
            required: true
        }
    }
};
</script>
