<script setup>
import { ref } from 'vue';
import VinylCover from './VinylCover.vue';
import Vinyl from './Vinyl.vue';

const preview = ref({});
</script>

<template>
    <div class="flex flex-col justify-center h-full">
        <div class="h-[30dvh] w-[30dvh] relative">
            <img v-if="preview.value" :src="preview.value.cover" alt="" class="h-full w-full" />
            <div v-if="preview.value" class="h-full w-full absolute -z-50 top-0 -translate-x-1/2 flex justify-center items-center">
                <Vinyl :cover="preview.value.cover" />
            </div>
        </div>
        <p class="flex flex-col items-start ">
            <span v-if="preview.value" class="font-bold">{{ preview.value.title }}</span>
            <span v-if="preview.value" class="font-semibold text-neutral-700 text-xs">{{ preview.value.artist }}</span>
        </p>
    </div>
    <div class="flex flex-grow justify-center items-center h-full perspective-1000 gap-1">
        <VinylCover @mouseover="preview.value = song" v-for="(song, index) in queue" :key="song.id" :song="song" :zIndex="index > queue.length / 2 ? -index : index" :isPreviewed="preview.value === song" />
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