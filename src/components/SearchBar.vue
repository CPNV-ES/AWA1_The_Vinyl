<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
</script>
<template>
    <div class="flex-grow flex items-center relative">
        <input
            class="align-middle rounded-full border-neutral-500 border bg-white outline-none cursor-pointer transition-all duration-300 h-full w-full px-3 py-1"
            type="text" placeholder="Search for a song" />
        <MagnifyingGlassIcon class="h-6 w-6 text-neutral-500 absolute right-2" />
    </div>
</template>


<script>
export default { name: 'SearchBar' };
</script>
