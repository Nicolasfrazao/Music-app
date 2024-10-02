/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

/**
 * A React component that wraps an <audio> element and provides
 * additional state management and event handling.
 *
 * @param {{
 *   activeSong: Song | null,
 *   isPlaying: boolean,
 *   volume: number,
 *   seekTime: number,
 *   onEnded: () => void,
 *   onTimeUpdate: () => void,
 *   onLoadedData: () => void,
 *   repeat: boolean,
 * }} props
 * @returns {JSX.Element} A JSX element containing the <audio> element.
 */
const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}: {
  activeSong: Song | null;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: () => void;
  onTimeUpdate: () => void;
  onLoadedData: () => void;
  repeat: boolean;
}): JSX.Element => {
  const ref = useRef<HTMLAudioElement | null>(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};


export default Player;
