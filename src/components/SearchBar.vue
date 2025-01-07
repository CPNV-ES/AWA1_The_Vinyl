<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { Song } from '../lib/Song';
import SongBanner from './SongBanner.vue';

// mocks
import mockedSongs from '../../public/mocks/songs.json';
</script>

<template>
    <div class="flex-grow flex items-center relative">
        <input
            class="align-middle rounded-full border-neutral-500 border bg-white outline-none cursor-pointer transition-all duration-300 h-full w-full px-3 py-1"
            type="text" placeholder="Search for a song" v-model="searchQuery" @input="search"/>
        <MagnifyingGlassIcon class="h-6 w-6 text-neutral-500 absolute right-2" />
        <div :class="['absolute transform translate-z-1 shadow-lg top-10 w-full bg-neutral-800 rounded-lg text-white text-center overflow-hidden' , searchQuery.length > 0 ? 'block' : 'hidden']">
            <SongBanner v-for="song in songs" :key="song.id" :song="song" @click="$emit('onPick:song', song), searchQuery=''"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            searchQuery: '',
            songs: [],
        };
    },
    methods: {
        search(event) {
            // mock
            this.songs = mockedSongs.map(({ title, artist, cover }) => new Song(title, artist, cover));
        }
    }
};
</script>
