<script setup>
import { ref } from 'vue';
import VinylPlayerButton from './VinylPlayerButton.vue';

const pressedBackward = ref(false);
const pressedForward = ref(false);
const clickedPause = ref(true);
</script>

<template>
    <div id="player" class="perspective-1000">
        <div id="player-top" class="bg-orange-900 h-[50dvh] w-[50dvh]"></div>
        <div id="player-face" class="bg-orange-950 h-[10dvh] w-[50dvh] flex justify-evenly items-center origin-top transform -rotate-x-30">
            <VinylPlayerButton content="backward" :pressed="pressedBackward" @onPress:pressed="pressedBackward = $event" />
            <VinylPlayerButton content="pause" :pressed="clickedPause" @click="clickedPause = clickedPause? clickedPause: !clickedPause" />
            <VinylPlayerButton content="play" :pressed="!clickedPause" @click="clickedPause = !clickedPause? clickedPause: !clickedPause" />
            <VinylPlayerButton content="forward" :pressed="pressedForward" @onPress:pressed="pressedForward = $event" />
        </div>
    </div>
</template>