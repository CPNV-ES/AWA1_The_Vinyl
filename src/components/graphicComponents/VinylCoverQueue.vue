<script setup>
import { ref, computed, defineProps, watch } from "vue";
import VinylCover from "./VinylCover.vue";
import SongPreview from "../SongPreview.vue";
import { onMounted } from "vue";

const props = defineProps({
	queue: {
		type: Array,
		required: true,
		default: () => [],
	},
});

const preview = ref({});
const visibleCoverCount = 15;
const visibleCoverStartIndex = ref(0);

var visibleCovers = [];

watch(
	() => props.queue,
	(newQueue) => {
		visibleCovers = computed(() => {
			return props.queue.slice(
				visibleCoverStartIndex.value,
				visibleCoverStartIndex.value + visibleCoverCount
			);
		});
	},
	{ deep: true }
);

function moveCoversRight() {
	if (visibleCoverStartIndex.value + visibleCoverCount < props.queue.length) {
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
	<template v-if="!queue">loading...</template>
	<template v-else-if="!queue.length">empty</template>
	<template v-else>
		<div class="flex flex-col w-full h-full relative">
			<div class="h-[15dvh] w-[15dvh] absolute top-20 left-[5dvh]">
				<SongPreview :song="preview" />
			</div>
			<div
				class="flex h-full items-center flex-grow gap-1 transform pt-[15dvh] pl-[5dvh]">
				<VinylCover
					@mouseover="preview = album"
					v-for="(album, index) in visibleCovers"
					:key="album.id"
					:zIndex="index > visibleCoverCount / 2 ? -index : index"
					:cover="album.cover"
					:isPreviewed="preview === album"
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
