<script setup>
import VinylCover from './VinylCover.vue';
</script>

<template>
    <div class="flex justify-center items-center h-full w-[50dvw] perspective-1000 gap-1">
        <VinylCover v-for="(song, index) in queue" :key="song.id" :song="song" :zIndex="index > queue.length/2? -index : index" />
    </div>
</template>

<script>
export default {
    name: 'VinylCoverQueue',
    props: {
        queue: {
            type: Array,
            required: true
        }
    }
};
</script>
