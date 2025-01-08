<script setup>
import { ref, computed } from "vue";
import VinylCover from "./VinylCover.vue";
import SongPreview from "../SongPreview.vue";
import { onMounted } from "vue";

const props = defineProps({
	queue: {
		type: Object,
		required: true,
	},
});

console.log(props.queue.values);

const preview = ref(null);
const visibleCoverCount = 15;
const visibleCoverStartIndex = ref(0);
const visibleCovers = computed(() => {
	return props.queue.slice(
		visibleCoverStartIndex,
		visibleCoverStartIndex + visibleCoverCount
	);
});

function moveCoversRight() {
	if (visibleCoverStartIndex + visibleCoverCount < queue.length) {
		visibleCoverStartIndex++;
	}
}

function moveCoversLeft() {
	if (visibleCoverStartIndex > 0) {
		visibleCoverStartIndex--;
	}
}

onMounted(() => {
	window.addEventListener("wheel", (event) => {
		if (event.deltaY > 0) {
			moveCoversRight();
		} else {
			moveCoversLeft();
		}
	});
});
</script>
<template>
	<template v-if="!queue">loading...</template>
	<template v-else-if="!queue.length">empty</template>
	<template v-else>
		<div class="flex flex-col w-full h-full relative">
			<div class="h-[15dvh] w-[15dvh] absolute top-20 left-[5dvh]">
				<SongPreview :preview />
			</div>
			<div
				class="flex h-full items-center flex-grow gap-1 transform pt-[15dvh] pl-[5dvh]">
				<VinylCover
					@mouseover="preview = song"
					v-for="(album, index) in visibleCovers"
					:key="album.id"
					:zIndex="index > visibleCoverCount / 2 ? -index : index"
					:cover="album.album.images[0].url"
					:isPreviewed="preview === song"
					:translucent="
						(visibleCoverStartIndex > 0 && index == 0) ||
						(index == visibleCoverCount - 1 &&
							visibleCoverStartIndex <
								queue.length - visibleCoverCount)
					" />
			</div>
		</div>
	</template>
</template>
