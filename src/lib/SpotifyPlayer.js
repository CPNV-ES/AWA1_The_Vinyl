import SpotifyAuthentication from "./SpotifyAuthentication.js";

class SpotifyPlayer {
	constructor(store) {
		this.store = store;
		this.token = SpotifyAuthentication.getAccessToken();
		this.player = null;
	}

	initPlayer() {
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		window.onSpotifyWebPlaybackSDKReady = this.setupPlayer.bind(this);
	}

	setupPlayer() {
		this.player = new window.Spotify.Player({
			name: "Web Playback SDK",
			getOAuthToken: (cb) => {
				cb(this.token);
			},
			volume: 0.3,
		});

		this.store.setPlayer(this.player);

		this.player.addListener("ready", ({ device_id }) => {
			console.log("Ready with Device ID", device_id);
			this.store.setDeviceId(device_id);
			SpotifyAuthentication.transferPlayback(device_id);
		});

		this.player.addListener("not_ready", ({ device_id }) => {
			console.log("Device ID has gone offline", device_id);
		});

		this.player.addListener("player_state_changed", (state) => {
			if (!state) return;
			this.store.setTrack(state.track_window.current_track);
			this.store.setPaused(state.paused);

			this.player.getCurrentState().then((state) => {
				if (!state) {
					this.store.setActive(false);
				} else {
					this.store.setActive(true);
				}
			});
		});

		this.player.connect();
	}

	playPreviousTrack() {
		this.player.previousTrack();
	}

	togglePlay() {
		this.player.togglePlay();
	}

	playNextTrack() {
		this.player.nextTrack();
	}
}

export default SpotifyPlayer;
