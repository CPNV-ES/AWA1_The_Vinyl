<script setup>
import { ref, computed } from 'vue';
import VinylCover from './VinylCover.vue';
import Vinyl from './Vinyl.vue';
</script>

<template>
    <div class="flex flex-col justify-center h-full">
        <div class="h-[30dvh] w-[30dvh] relative">
            <img v-if="preview.value" :src="preview.value.cover" alt="" class="h-full w-full" />
            <div v-if="preview.value"
                class="h-full w-full absolute -z-50 top-0 -translate-x-1/2 flex justify-center items-center">
                <Vinyl :cover="preview.value.cover" />
            </div>
        </div>
        <p class="flex flex-col items-start ">
            <span v-if="preview.value" class="font-bold">{{ preview.value.title }}</span>
            <span v-if="preview.value" class="font-semibold text-neutral-700 text-xs">{{ preview.value.artist }}</span>
        </p>
    </div>
    <div class="flex h-full justify-center flex-grow perspective-1000">
        <div class="flex w-full items-center h-full gap-1 mx-[5dvh]">
            <VinylCover @mouseover="preview.value = song" v-for="(song, index) in visibleCovers" :key="song.id"
                :zIndex="index > visibleCoverCount / 2 ? -index : index" :song="song" :isPreviewed="preview.value === song"
                :translucent="visibleCoverStartIndex > 0 && index == 0 || index == visibleCoverCount -1 && visibleCoverStartIndex < queue.length - visibleCoverCount" />
        </div>
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
    },
    data() {
        return {
            preview: ref({}),
            visibleCoverCount: 10,
            visibleCoverStartIndex: ref(0),
            visibleCovers: computed(() => {
                return this.queue.slice(this.visibleCoverStartIndex, this.visibleCoverStartIndex + this.visibleCoverCount);
            })
        };
    }
};
</script>