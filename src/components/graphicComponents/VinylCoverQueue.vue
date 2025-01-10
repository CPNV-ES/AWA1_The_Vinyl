<script setup>
import { ref, computed, watch } from "vue";
import VinylCover from "./VinylCover.vue";
import SongPreview from "../SongPreview.vue";
import { onMounted } from "vue";
import { useSpotifyStore } from "../../stores/spotify";

const store = useSpotifyStore();

const visibleCoverCount = 15;
const visibleCoverStartIndex = ref(0);

let visibleCovers = [];

watch(
	() => store.queue,
	() => {
		visibleCovers = computed(() => {
			return store.queue.slice(
				visibleCoverStartIndex.value,
				visibleCoverStartIndex.value + visibleCoverCount
			);
		});
	},
	{ deep: true }
);

function moveCoversRight() {
	if (visibleCoverStartIndex.value + visibleCoverCount < store.queue.length) {
		visibleCoverStartIndex.value++;
	}
}

function moveCoversLeft() {
	if (visibleCoverStartIndex.value > 0) {
		visibleCoverStartIndex.value--;
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
	<template v-if="store.queue.length">
		<div class="flex flex-col w-full h-full relative">
			<div class="h-[15dvh] w-[15dvh] absolute top-20 left-[5dvh]">
				<SongPreview v-if="store.preview" :song="store.preview" />
			</div>
			<div
				class="flex h-full items-center flex-grow gap-1 transform pt-[15dvh] pl-[5dvh]">
				<VinylCover
					@mouseover="store.setPreview(album)"
					v-for="(album, index) in visibleCovers"
					:key="album.id"
					:zIndex="index > visibleCoverCount / 2 ? -index : index"
					:cover="album.cover"
					:isPreviewed="store.preview === album"
					:translucent="
						(visibleCoverStartIndex > 0 && index == 0) ||
						(index == visibleCoverCount - 1 &&
							visibleCoverStartIndex <
								store.queue.length - visibleCoverCount)
					" />
			</div>
		</div>
	</template>
</template>
