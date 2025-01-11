<script setup>
import { PlayIcon } from "@heroicons/vue/24/solid";
import { Song } from "../lib/Song";

defineProps({
	song: {
		type: Song,
		required: true,
	},
});
</script>

<template>
	<div class="flex-grow flex items-center gap-2 relative p-2 hover:bg-neutral-700 group/song-banner">
		<div class="relative h-12 w-12 rounded-md overflow-hidden">
			<div
				class="group-hover/song-banner:flex hidden bg-black bg-opacity-70 absolute h-full w-full justify-center items-center">
				<PlayIcon class="h-2/5 w-2/5" />
			</div>
			<img :src="song.cover" alt="" class="h-full w-full" />
		</div>
		<p class="overflow-hidden flex flex-col items-start text-left text-white w-full">
			<span :title="song.title" class="truncate w-full">{{ song.title }}</span>
			<span :title="song.artist" class="truncate text-neutral-300 text-xs w-full">{{ song.artist }}</span>
		</p>
		<span class="absolute right-6 text-3xl text-transparent group-hover/song-banner:text-white">+</span>
	</div>
</template>
