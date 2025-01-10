<script setup>
import { ref } from "vue";
import VinylPlayerButton from "./VinylPlayerButton.vue";
import Vinyl from "./Vinyl.vue";
import {
	ForwardIcon,
	BackwardIcon,
	PlayIcon,
	PauseIcon,
} from "@heroicons/vue/24/solid";
import { useSpotifyStore } from "../../stores/spotify";

const pressedBackward = ref(false);
const pressedForward = ref(false);

const store = useSpotifyStore();

defineProps({
	player: {
		type: Object,
	}
});
</script>

<template>
	<div id="player" class="relative">
		<div
			id="player-top"
			class="bg-orange-900 h-[50dvh] w-[50dvh] flex justify-center items-center origin-bottom transform rotate-x-60 overflow-hidden">
			<template v-if="store.isActive">
				<Vinyl
					v-if="store.currentTrack"
					:isPlaying="!store.isPaused"
					:cover="store.currentTrack.cover" />
			</template>
		</div>
		<div
			id="player-right"
			class="absolute h-[50dvh] w-[10dvh] bg-orange-950 brightness-75 top-0 -right-[10dvh] origin-bottom-left transform rotate-x-60 rotate-y-90"></div>
		<div
			id="player-face"
			class="bg-orange-950 h-[10dvh] w-[50dvh] flex justify-evenly items-center origin-top transform -rotate-x-30">
			<VinylPlayerButton
				:pressed="pressedBackward"
				@onPress:pressed="pressedBackward = $event"
				@click="player.playPreviousTrack()">
				<BackwardIcon class="h-[3dvh] w-[3dvh] text-neutral-300" />
			</VinylPlayerButton>
			<VinylPlayerButton
				:pressed="store.isPaused"
				@click="store.isPaused ? void 0 : player.togglePlay()">
				<PauseIcon class="h-[3dvh] w-[3dvh] text-neutral-300" />
			</VinylPlayerButton>
			<VinylPlayerButton
				:pressed="!store.isPaused"
				@click="store.isPaused ? player.togglePlay() : void 0">
				<PlayIcon class="h-[3dvh] w-[3dvh] text-neutral-300" />
			</VinylPlayerButton>
			<VinylPlayerButton
				:pressed="pressedForward"
				@onPress:pressed="pressedForward = $event"
				@click="player.playNextTrack()">
				<ForwardIcon class="h-[3dvh] w-[3dvh] text-neutral-300" />
			</VinylPlayerButton>
		</div>
	</div>
</template>
