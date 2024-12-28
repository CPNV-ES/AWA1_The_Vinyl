<script setup>
import Vinyl from './graphicComponents/Vinyl.vue';
</script>

<template>
    <div class="h-full w-full flex gap-3">
        <div class="h-full w-full aspect-square">
            <img v-if="preview" :src="preview.cover" alt=""
                class="inset-0 h-full w-full object-center object-cover" />
            <div v-if="preview"
                class="h-full w-full absolute -z-50 top-0 -translate-x-1/2 flex justify-center items-center">
                <Vinyl :cover="preview.cover" />
            </div>
        </div>
        <p class="flex flex-col text-nowrap">
            <span v-if="preview" class="font-bold text-2xl">{{ preview.title }}</span>
            <span v-if="preview" class="font-semibold text-neutral-700">{{ preview.artist }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'SongPreview',
    props: {
        preview: {
            type: Object,
            required: true
        }
    }
};
</script>