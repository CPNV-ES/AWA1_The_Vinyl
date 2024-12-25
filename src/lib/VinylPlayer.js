import { ref } from 'vue';
// TODO: Implement the API calls in the methods
export class VinylPlayer {
    constructor() {
        this._isPlaying = ref(false);
        this.queue = ref([]);
    }

    get isPlaying() {
        return this._isPlaying.value;
    }

    set isPlaying(value) {
        this._isPlaying.value = value;
    }

    // Launches the reading of the musics
    play() {
        if (this._isPlaying.value) return;
        this._isPlaying.value = true;
        console.log('play');
    }

    // Pauses the reading of the musics
    pause() {
        if (!this._isPlaying.value) return;
        this._isPlaying.value = false;
        console.log('pause');
    }

    // Skips to the next track
    next() {
        console.log('next');
    }

    // Goes back to the previous track
    previous() {
        console.log('previous');
    }

    addToQueue(song) {
        this.queue.value.push(song);
    }
}