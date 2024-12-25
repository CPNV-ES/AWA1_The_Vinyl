<script setup>
    import { Song } from '../../lib/Song';
</script>

<template>
    <div class="">a
    </div>
</template>

<script>
export default {
    name: 'VinylCover',
    props: {
        song: {
            type: Song,
            required: true
        }
    }
};
</script>