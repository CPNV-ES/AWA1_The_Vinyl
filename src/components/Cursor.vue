<template>
	<div
		id="cursor"
		class="inset-0 absolute translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full pointer-events-none transform translate-z-[100dvh] mix-blend-difference"></div>
</template>

<style>
* {
	cursor: none !important;
}
</style>

<script>
export default {
	name: "Cursor",
	mounted() {
		const cursor = document.getElementById("cursor");
		document.addEventListener("mousemove", (event) => {
			cursor.style.left = event.clientX + "px";
			cursor.style.top = event.clientY + "px";
		});
	},
};
</script>
