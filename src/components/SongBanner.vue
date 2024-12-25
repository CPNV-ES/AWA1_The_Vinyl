<script setup>
import { PlayIcon } from '@heroicons/vue/24/solid';
</script>

<template>
    <div class="flex-grow flex items-center gap-2 relative p-2 hover:bg-neutral-700 group">
        <div class="relative h-12 w-12 rounded-md overflow-hidden">
            <div class="group-hover:flex hidden bg-black bg-opacity-70 absolute h-full w-full justify-center items-center"><PlayIcon class="h-2/5 w-2/5" /></div>
            <img src="/spotify-icon.svg" alt="" class="h-full w-full" />
        </div>
        <p class="flex flex-col items-start text-white">
            <span>Smooth Operator - Single Version</span>
            <span class="text-neutral-300 text-xs">Sade</span>
        </p>
        <span class="absolute right-6 text-3xl text-transparent group-hover:text-white">+</span>
    </div>
</template>


<script>
export default { name: 'SongBanner' };
</script>
