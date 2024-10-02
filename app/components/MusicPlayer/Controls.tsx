import React from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

/**
 * A component that displays playback controls for a list of songs.
 *
 * @param {{ isPlaying: boolean, repeat: boolean, setRepeat: (repeat: boolean) => void, shuffle: boolean, setShuffle: (shuffle: boolean) => void, currentSongs: Song[], handlePlayPause: () => void, handlePrevSong: () => void, handleNextSong: () => void }} props
 * @returns {JSX.Element} A JSX element containing the controls.
 */
const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }: {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: (repeat: boolean) => void;
  shuffle: boolean;
  setShuffle: (shuffle: boolean) => void;
  currentSongs: Song[];
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}): JSX.Element => (
  <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
    <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    {currentSongs?.length && <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
    {isPlaying ? (
      <BsFillPauseFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    ) : (
      <BsFillPlayFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
    )}
    {currentSongs?.length && <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
    <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
  </div>
);

export default Controls;
