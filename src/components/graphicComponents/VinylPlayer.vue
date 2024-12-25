<script setup>
import { VinylPlayer } from '../../lib/VinylPlayer';
import { ref } from 'vue';
import VinylPlayerButton from './VinylPlayerButton.vue';
import Vinyl from './Vinyl.vue';
import { ForwardIcon, BackwardIcon, PlayIcon, PauseIcon } from '@heroicons/vue/24/solid';

const pressedBackward = ref(false);
const pressedForward = ref(false);
const player = new VinylPlayer();
</script>

<template>
    <div id="player" class="perspective-1000">
        <div id="player-top" class="bg-orange-900 h-[50dvh] w-[50dvh] flex justify-center items-center origin-bottom transform rotate-x-60 overflow-hidden">
            <Vinyl :isPlaying="player.isPlaying" />
        </div>
        <div id="player-face" class="bg-orange-950 h-[10dvh] w-[50dvh] flex justify-evenly items-center origin-top transform -rotate-x-30">
            <VinylPlayerButton :pressed="pressedBackward" @onPress:pressed="pressedBackward = $event" @click="player.previous()">
                <BackwardIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
            <VinylPlayerButton :pressed="!player.isPlaying" @click="player.pause()">
                <PauseIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
            <VinylPlayerButton :pressed="player.isPlaying" @click="player.play()">
                <PlayIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
            <VinylPlayerButton :pressed="pressedForward" @onPress:pressed="pressedForward = $event" @click="player.next()">
                <ForwardIcon class="h-6 w-6 text-neutral-300" />
            </VinylPlayerButton>
        </div>
    </div>
</template>