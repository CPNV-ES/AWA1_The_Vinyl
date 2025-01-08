<script setup>
import Vinyl from './graphicComponents/Vinyl.vue';
</script>

<template>
    <div class="h-full w-full flex gap-3">
        <div class="h-full w-full aspect-square">
            <img v-if="song" :src="song.album.images[0].url" alt=""
                class="inset-0 h-full w-full object-center object-cover" />
            <div v-if="song"
                class="h-full w-full absolute -z-50 top-0 -translate-x-1/2 flex justify-center items-center">
                <Vinyl :cover="song.album.images[0].url" />
            </div>
        </div>
        <p class="flex flex-col text-nowrap">
            <span v-if="song" class="font-bold text-2xl">{{ song.name }}</span>
            <span v-if="song" class="font-semibold text-neutral-700">{{ song.artists[0].name }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'SongPreview',
    props: {
        song: {
            type: Object,
            required: true
        }
    }
};
</script>