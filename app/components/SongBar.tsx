/* eslint-disable no-nested-ternary */
import React from 'react';
import Image from "next/image";
import Link from 'next/link';

import PlayPause from './PlayPause';

/**
 * A component that displays a song bar with the song title, artist name, and
 * album name. If the song is playable, it also displays a play/pause button.
 *
 * @param {{ song: Song, i: number, artistId: string | null, isPlaying: boolean, activeSong: Song | null, handlePauseClick: () => void, handlePlayClick: (song: Song, i: number) => void }} props
 * @returns {JSX.Element} A JSX element containing the song bar.
 */
const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: {
  song: Song,
  i: number,
  artistId: string | null,
  isPlaying: boolean,
  activeSong: Song | null,
  handlePauseClick: () => void,
  handlePlayClick: (song: Song, i: number) => void,
}): JSX.Element => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <Image
        className="w-20 h-20 rounded-lg"
        src={artistId ? song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125') : song?.images?.coverart}
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link href={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">
              {song?.title}
            </p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">
            {song?.attributes?.name}
          </p>
        )}
        <p className="text-base text-gray-300 mt-1">
          {artistId ? song?.attributes?.albumName : song?.subtitle}
        </p>
      </div>
    </div>
    {!artistId
      ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      )
      : null}
  </div>
);

export default SongBar;
