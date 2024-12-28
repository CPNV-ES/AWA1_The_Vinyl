<script setup>
import { ref, computed } from 'vue';
import VinylCover from './VinylCover.vue';
import Vinyl from './Vinyl.vue';
</script>

<template>
    <div class="flex flex-col w-full h-full relative ">
        <div class="absolute top-14 left-[5dvh] flex gap-3">
            <div class="h-[15dvh] w-[15dvh] aspect-square">
                <img v-if="preview.value" :src="preview.value.cover" alt=""
                    class="inset-0 h-[15dvh] w-[15dvh] object-center object-cover" />
                <div v-if="preview.value"
                    class="h-full w-full absolute -z-50 top-0 -translate-x-1/2 flex justify-center items-center">
                    <Vinyl :cover="preview.value.cover" />
                </div>
            </div>
            <p class="flex flex-col">
                <span v-if="preview.value" class="font-bold text-2xl">{{ preview.value.title }}</span>
                <span v-if="preview.value" class="font-semibold text-neutral-700">{{ preview.value.artist }}</span>
            </p>
        </div>
        <div class="flex h-full items-center flex-grow gap-1 transform pt-[15dvh] pl-[5dvh]">
            <VinylCover @mouseover="preview.value = song" v-for="(song, index) in visibleCovers" :key="song.id"
                :zIndex="index > visibleCoverCount / 2 ? -index : index" :song="song"
                :isPreviewed="preview.value === song"
                :translucent="visibleCoverStartIndex > 0 && index == 0 || index == visibleCoverCount - 1 && visibleCoverStartIndex < queue.length - visibleCoverCount" />
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
            visibleCoverCount: 15,
            visibleCoverStartIndex: ref(0),
            visibleCovers: computed(() => {
                return this.queue.slice(this.visibleCoverStartIndex, this.visibleCoverStartIndex + this.visibleCoverCount);
            })
        };
    },
    methods: {
        moveCoversRight() {
            if (this.visibleCoverStartIndex + this.visibleCoverCount < this.queue.length) {
                this.visibleCoverStartIndex++;
            }
        },
        moveCoversLeft() {
            if (this.visibleCoverStartIndex > 0) {
                this.visibleCoverStartIndex--;
            }
        }
    },
    mounted() {
        window.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                this.moveCoversRight();
            } else {
                this.moveCoversLeft();
            }
        });
    }
};
</script>