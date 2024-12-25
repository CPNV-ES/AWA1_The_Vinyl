<template>
    <button class="perspective-1000" @mousedown="$emit('onPress:pressed', true)" @mouseup="$emit('onPress:pressed', false)" @mouseleave="$emit('onPress:pressed', false)">
        <div :class="['bg-neutral-950 text-white', pressed ? 'h-2' : 'h-6', 'origin-bottom transform rotate-x-60']"></div>
        <div class="bg-black text-white h-fit p-2">
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