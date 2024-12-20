<script setup>
import SpotifyAuthentication from "../services/SpotifyAuthentication.js";

const spotifyCredentials = new SpotifyAuthentication();

if (spotifyCredentials.isLogged()) {
  window.location.href = "/";
}

</script>

<template>
    <h1>The Vinyl</h1>
    <button name="login" @click="spotifyCredentials.authenticate()" class="button-spotify"><b>Login to Spotify</b></button>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Matemasie&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pacifico&display=swap');

h1 {
    font-family: 'Pacifico', cursive;
    font-size: 10dvh;
    text-align: center;
    margin-top: 0;
}

.button-spotify {
    width: 20rem;
    height: 3rem;
}
</style>
