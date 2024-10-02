import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    /**
     * Set the next song in the current playlist.
     *
     * @param {number} nextSongIndex The index of the next song.
     * @returns {void}
     */
    nextSong: (state, action: { payload: number }): void => {
      const nextSongIndex = action.payload;
      const nextSong = state.currentSongs[nextSongIndex]?.track || state.currentSongs[nextSongIndex] as Song;

      state.activeSong = nextSong;
      state.currentIndex = nextSongIndex;
      state.isActive = true;
    },

    /**
     * Set the previous song in the current playlist.
     *
     * @param {number} prevSongIndex The index of the previous song.
     * @returns {void}
     */
    prevSong: (state, action: { payload: number }): void => {
      const prevSongIndex = action.payload;
      const prevSong =
        state.currentSongs[prevSongIndex]?.track || state.currentSongs[prevSongIndex] as Song;

      state.activeSong = prevSong;
      state.currentIndex = prevSongIndex;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;
