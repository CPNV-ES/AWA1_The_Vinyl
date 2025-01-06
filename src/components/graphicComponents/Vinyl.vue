<template>
  <div class="relative bg-vinyl-texture w-5/6 h-5/6 rounded-full flex justify-center items-center shadow-md">
    <div :class="['absolute h-full w-full rounded-full bg-grainy-texture opacity-100 mix-blend-difference animate-spin-slow', isPlaying? '[animation-play-state:running]' : '[animation-play-state:paused]']"></div>
    <img v-if="cover" :src="cover" alt="" :class="['bg-neutral-800 w-1/3 h-1/3 rounded-full animate-spin-slow', isPlaying? '[animation-play-state:running]' : '[animation-play-state:paused]']" />
  </div>
</template>

<script>
export default {
  name: 'Vinyl',
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    cover: {
      type: String,
    }
  }
};
</script>