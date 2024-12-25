<script setup>
import { ref } from 'vue';
import { ForwardIcon, BackwardIcon, PlayIcon, PauseIcon } from '@heroicons/vue/24/solid';
import VinylPlayerButton from './VinylPlayerButton.vue';
import Vinyl from './Vinyl.vue';

const pressedBackward = ref(false);
const pressedForward = ref(false);
const isPlaying = ref(false);
</script>

<template>
    <div id="player" class="perspective-1000">
        <div id="player-top" class="bg-orange-900 h-[50dvh] w-[50dvh] flex justify-center items-center origin-bottom transform rotate-x-60 overflow-hidden">
            <Vinyl :isPlaying/>
        </div>
        <div id="player-face" class="bg-orange-950 h-[10dvh] w-[50dvh] flex justify-evenly items-center origin-top transform -rotate-x-30">
            <VinylPlayerButton content="backward" :pressed="pressedBackward" @onPress:pressed="pressedBackward = $event">
                <BackwardIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
            <VinylPlayerButton content="pause" :pressed="!isPlaying" @click="isPlaying = !isPlaying? isPlaying: !isPlaying">
                <PauseIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
            <VinylPlayerButton content="play" :pressed="isPlaying" @click="isPlaying = isPlaying? isPlaying: !isPlaying">
                <PlayIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
            <VinylPlayerButton content="forward" :pressed="pressedForward" @onPress:pressed="pressedForward = $event">
                <ForwardIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
        </div>
    </div>
</template>