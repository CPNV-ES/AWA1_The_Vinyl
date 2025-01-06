<template>
    <button class="transform-style-flat" @mousedown="$emit('onPress:pressed', true)" @mouseup="$emit('onPress:pressed', false)" @mouseleave="$emit('onPress:pressed', false)">
        <div :class="['bg-neutral-950 z-0 text-white', pressed ? 'h-[1dvh]' : 'h-[3dvh]', 'origin-bottom transform rotate-x-60']"></div>
        <div class="bg-black text-white h-fit p-2 -mt-1 z-10">
          <slot></slot>
        </div>
    </button>
</template>

<script>
export default {
  name: 'VinylPlayerButton',
  props: {
    pressed: {
      type: Boolean,
      default: false
    }
  }
};
</script>