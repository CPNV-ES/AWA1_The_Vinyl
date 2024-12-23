<template>
    <button class="perspective-400" @mousedown="$emit('onPress:pressed', true)" @mouseup="$emit('onPress:pressed', false)">
        <div :class="['bg-neutral-950 text-white', pressed ? 'h-2 -mt-3' : 'h-6', 'origin-bottom transform rotate-x-30']"></div>
        <div class="bg-black text-white h-fit p-2">{{ content }}</div>
    </button>
</template>

<script>
export default {
  name: 'VinylPlayerButton',
  props: {
    content: {
      type: String,
      required: true
    },
    pressed: {
      type: Boolean,
      default: false
    }
  }
};
</script>