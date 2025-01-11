<script setup>
import Vinyl from "./graphicComponents/Vinyl.vue";
import { Song } from "../lib/Song";

defineProps({
	song: {
		type: Song,
		required: true,
	},
});
</script>

<template v-if="song">
	<div class="h-full w-full flex gap-3">
		<div class="h-full w-full aspect-square">
			<img
				:src="song.cover"
				alt=""
				class="inset-0 h-full w-full object-center object-cover" />
			<div
				class="h-full w-full absolute -z-50 top-0 -translate-x-1/2 flex justify-center items-center">
				<Vinyl :cover="song.cover" />
			</div>
		</div>
		<p class="flex flex-col text-nowrap">
			<span class="font-bold text-2xl">{{ song.title }}</span>
			<span class="font-semibold text-neutral-700">{{
				song.artist
			}}</span>
		</p>
	</div>
</template>
