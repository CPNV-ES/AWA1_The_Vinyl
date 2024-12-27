<script setup>
import { Song } from '../../lib/Song';
</script>

<template>
    <div :style="{ zIndex }" class="h-[30dvh] w-[1.5dvh] transform -rotate-x-30 -rotate-y-90 overflow-visible transform-style-3d">
        <div class="h-[30dvh] w-[30dvh] relative flex container transform-style-3d">
            <img :src="song.cover" alt=""  class="top absolute z-50 bg-neutral-500 h-[1.5dvh] w-full object-cover object-top origin-bottom -top-[1.5dvh] transform rotate-x-90 rotate-y-0"/>
            <img :src="song.cover" alt=""  class="face bg-neutral-500 h-full w-full"/>
            <img :src="song.cover" alt=""  class="back absolute brightness-[.1] bg-neutral-800 h-full w-full transform rotate-x-0 rotate-y-0 -translate-z-[1.5dvh]"/>
            <img :src="song.cover" alt=""  class="right absolute brightness-[.4] z-10 bg-neutral-600 h-full w-[1.5dvh] object-cover object-right origin-left -right-[1.5dvh] transform rotate-x-0 rotate-y-90"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VinylCover',
    props: {
        song: {
            type: Song,
            required: true
        },
        zIndex: {
            type: Number,
            required: true
        }
    }
};
</script>