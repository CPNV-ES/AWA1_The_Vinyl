<script setup>
import VinylPlayer from '../components/graphicComponents/VinylPlayer.vue';
import SearchBar from '../components/SearchBar.vue';
</script>

<template>
    <nav class="justify-between flex gap-4">
        <SearchBar />
        <button name="logout" class="button-spotify px-3 py-1"><b>Logout</b></button>
    </nav>
    <div class="grow flex flex-col lg:flex-row">
        <section class="flex justify-center items-center h-full w-[50dvw]">
            <VinylPlayer />
        </section>
        <section class="flex justify-center items-center h-full w-[50dvw]">B</section>
    </div>
</template>

<script>
export default { name: 'Home' };
</script>
