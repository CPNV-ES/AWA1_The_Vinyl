import SpotifyAuthentication from "./SpotifyAuthentication.js";

class SpotifyPlayer {
	constructor(store) {
		this.store = store;
		this.token = SpotifyAuthentication.getAccessToken();
		this.player = null;
		this.isInitialized = false;
	}

	initPlayer() {
		if (this.isInitialized) return;

		this._loadSdkScript()
			.then(() => {
				window.onSpotifyWebPlaybackSDKReady =
					this._setupPlayer.bind(this);
			})
			.catch((error) => {
				console.error("Error loading the Spotify SDK:", error);
			});

		this.isInitialized = true;
	}

	togglePlay() {
		this.player.togglePlay();
	}

	playPreviousTrack() {
		this.player.previousTrack();
	}

	playNextTrack() {
		this.player.nextTrack();
	}

	_loadSdkScript() {
		return new Promise((resolve, reject) => {
			if (document.getElementById("spotify-player-script")) {
				return resolve();
			}

			const script = document.createElement("script");
			script.src = "https://sdk.scdn.co/spotify-player.js";
			script.async = true;
			script.id = "spotify-player-script";
			script.onload = resolve;
			script.onerror = reject;
			document.body.appendChild(script);
		});
	}

	_setupPlayer() {
		this.player = new window.Spotify.Player({
			name: "Web Playback SDK",
			getOAuthToken: (cb) => {
				cb(this.token);
			},
			volume: 0.3,
		});

		this.store.setPlayer(this.player);

		this._addPlayerEventListeners();

		this.player.connect();
	}

	_addPlayerEventListeners() {
		this.player.addListener("ready", ({ device_id }) => {
			console.log("Ready with Device ID", device_id);
			this.store.setDeviceId(device_id);
			SpotifyAuthentication.transferPlayback(device_id);
		});

		this.player.addListener("not_ready", ({ device_id }) => {
			console.log("Device ID has gone offline", device_id);
		});

		this.player.addListener("player_state_changed", (state) => {
			if (state) {
				this._handlePlayerStateChange(state);
			}
		});
	}

	_handlePlayerStateChange(state) {
		const { current_track } = state.track_window;
		const { paused } = state;

		this.store.setTrack(current_track);
		this.store.setPaused(paused);

		this.player.getCurrentState().then((state) => {
			if (!state) {
				this.store.setActive(false);
			} else {
				this.store.setActive(true);
			}
		});
	}
}

export default SpotifyPlayer;
