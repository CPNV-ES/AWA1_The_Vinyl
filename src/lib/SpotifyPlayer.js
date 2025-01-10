import SpotifyAuthentication from "./SpotifyAuthentication.js";

class SpotifyPlayer {
	constructor(store) {
		this.store = store;
		this.token = SpotifyAuthentication.getAccessToken();
		this.player = null;
		this.isInitialized = false;
	}

	/**
	 * Initialize the Spotify player
	 * @returns {void}
	 */
	initPlayer() {
		if (this.isInitialized) return;

		this.#loadSdkScript()
			.then(() => {
				window.onSpotifyWebPlaybackSDKReady =
					this.#setupPlayer.bind(this);
			})
			.catch((error) => {
				console.error("Error loading the Spotify SDK:", error);
			});

		this.isInitialized = true;
	}

	/**
	 * Play the current track
	 * @returns {void}
	 */
	togglePlay() {
		this.player.togglePlay();
	}

	/**
	 * Pause the current track
	 * @returns {void}
	 */
	playPreviousTrack() {
		this.player.previousTrack();
	}

	/**
	 * Play the next track
	 * @returns {void}
	 */
	playNextTrack() {
		this.player.nextTrack();
	}

	/**
	 * Seek to a specific position in the track
	 * @returns {Promise<void>}
	 */
	#loadSdkScript() {
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

	/**
	 * Setup the Spotify player
	 * @returns {void}
	 */
	#setupPlayer() {
		this.player = new window.Spotify.Player({
			name: "Web Playback SDK",
			getOAuthToken: (cb) => {
				cb(this.token);
			},
			volume: 0.3,
		});

		this.store.setPlayer(this.player);

		this.#addPlayerEventListeners();

		this.player.connect();
	}

	/**
	 * Add event listeners to the Spotify player
	 * @returns {void}
	 */
	#addPlayerEventListeners() {
		this.player.addListener("ready", ({ device_id }) => {
			this.store.setDeviceId(device_id);
			this.#transferPlayback(device_id);
		});

		this.player.addListener("player_state_changed", (state) => {
			if (state) {
				this.#handlePlayerStateChange(state);
			}
		});
	}

	/**
	 * Handle the player state change
	 * @param state {Object}
	 * @returns {void}
	 */
	#handlePlayerStateChange(state) {
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

	/**
	 * Transfer playback to the Spotify player
	 * @param device_id {string}
	 * @returns {void}
	 */
	#transferPlayback(device_id) {
		SpotifyAuthentication.getSdk().player.transferPlayback([device_id], true);
	}
}

export default SpotifyPlayer;
