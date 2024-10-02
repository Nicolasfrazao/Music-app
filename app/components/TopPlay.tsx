/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import FreeMode from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';
import { RootState } from '@reduxjs/toolkit/query';

/* eslint-disable */

/**
 * A function component that displays a single top chart song card.
 *
 * @param {{ song: Song, i: number, isPlaying: boolean, activeSong: Song | null, handlePauseClick: () => void, handlePlayClick: (song: Song) => void }} props
 * @returns {JSX.Element} A JSX element containing the top chart song card.
 */
const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}: {
  song: Song;
  i: number;
  isPlaying: boolean;
  activeSong: Song | null;
  handlePauseClick: () => void;
  handlePlayClick: (song: Song) => void;
}): JSX.Element => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === song.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-20 h-20 rounded-lg" src={song?.images?.coverart} alt={song?.title} />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link href={`/songs/${song.key}`}>
          <p className="text-xl font-bold text-white">
            {song?.title}
          </p>
        </Link>
        <Link href={`/artists/${song?.artists[0].adamid}`} >
          <p className="text-base text-gray-300 mt-1">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);


/**
 * A component that displays a list of top songs and artists.
 *
 * @param {{ activeSong: Song | null, isPlaying: boolean }} props
 * @returns {JSX.Element} A JSX element containing the top songs and artists.
 */
const TopPlay = ({
  activeSong,
  isPlaying,
}: {
  activeSong: Song | null;
  isPlaying: boolean;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { data } = useGetTopChartsQuery();
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song: Song, i: number) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link href="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song: Song, i: number) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link href="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.slice(0, 5).map((artist: { key: React.Key | null | undefined; artists: { adamid: any; }[]; images: { background: string | undefined; }; }) => (
            <SwiperSlide
              key={artist?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link href={`/artists/${artist?.artists[0].adamid}`}>
                <Image src={artist?.images?.background} alt="Name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;

