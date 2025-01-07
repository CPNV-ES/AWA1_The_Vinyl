<script setup>
import { Song } from '../../lib/Song';
</script>

<template>
    <div :style="{ zIndex }"
        class="h-[30dvh] w-[1.5dvh] transform -translate-y-1/4 -rotate-x-30 -rotate-y-90 overflow-visible">
        <div
            :class="['h-[30dvh] w-[30dvh] relative flex container transition-transform', isPreviewed ? 'translate-x-[15dvh]' : 'translate-x-0']">
            <img :class="['top absolute z-50 bg-neutral-500 h-[1.5dvh] w-full object-cover object-top origin-bottom -top-[1.5dvh] transform rotate-x-90 rotate-y-0',
                translucent ? 'opacity-30' : 'opacity-100']" :src="song.cover" alt="" />
            <img :class="['face bg-neutral-500 h-full w-full', translucent ? 'opacity-30' : 'opacity-100']"
                :src="song.cover" alt="" />
            <img :class="['back absolute brightness-[.1] bg-neutral-800 h-full w-full transform rotate-x-0 rotate-y-0 -translate-z-[1.5dvh]',
                translucent ? 'opacity-30' : 'opacity-100']" :src="song.cover" alt="" />
            <img :class="['right absolute brightness-[.4] z-10 bg-neutral-600 h-full w-[1.5dvh] object-cover object-right origin-left -right-[1.5dvh] transform rotate-x-0 rotate-y-90',
                translucent ? 'opacity-30' : 'opacity-100']" :src="song.cover" alt="" />
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
        },
        isPreviewed: {
            type: Boolean,
            default: false
        },
        translucent: {
            type: Boolean,
            default: false
        }
    }
};
</script>
