// Import components
import Pause from "@/icons/Pause.jsx";
import Play from "@/icons/Play.jsx";
import NextSong from "@/icons/NextSong.jsx";
import PreviousSong from "@/icons/PreviousSong.jsx";
import CurrentSong from "./Player/CurrentSong";
import SongControl from "./Player/SongControl";
import VolumeControl from "./Player/VolumeControl";

// Import utils
import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef, useState } from "react";

export function Player() {
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying, volume } =
    usePlayerStore((state) => state);

    const [indexSong, setIndexSong] = useState(0)

  const isThereSong =
    currentMusic.playlist === null &&
    currentMusic.song === null &&
    currentMusic.songs == false;

  const audioRef = useRef();

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = song.file;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
      audioRef.current.addEventListener("ended", nextSong);
      songs.forEach((element, index) => {
        element.id == song.id ? setIndexSong(index): undefined;
      });
    }
  }, [currentMusic, indexSong]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const idNextSong = indexSong + 1;
    console.log(indexSong);
    if (idNextSong  === currentMusic.songs.length) {
      setIndexSong(0);
      setCurrentMusic({
        ...currentMusic,
        song: currentMusic.songs[0],
      });
    } else {
      setCurrentMusic({
        ...currentMusic,
        song: currentMusic.songs[idNextSong],
      });
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const previousSong = () => {
    const idPreviousSong = indexSong - 1;
    console.log(currentMusic.song.id, idPreviousSong);
    if (
      idPreviousSong < 0 ||
      idPreviousSong === currentMusic.songs.length - 1
    ) {
      setIndexSong(0);
      setCurrentMusic({
        ...currentMusic,
        song: currentMusic.songs[currentMusic.songs.length - 1],
      });
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setCurrentMusic({
        ...currentMusic,
        song: currentMusic.songs[idPreviousSong],
      });
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  return (
    <>
      <div
        className={`flex-row items-center justify-between w-full h-full px-1 z-50 ${
          isThereSong ? "hidden" : "flex"
        }`}
      >
        <div className="w-[200px]">
          <CurrentSong {...currentMusic.song} />
        </div>

        <div className="grid place-content-center gap-4 flex-1">
          <div className="flex justify-center flex-col items-center">
            <div className="flex lg:justify-evenly justify-between w-[30%] gap-3 lg:gap-0">
              <button className="text-white" onClick={previousSong}>
                <PreviousSong />
              </button>
              <button
                className="bg-white rounded-full p-2"
                onClick={handleClick}
              >
                {isPlaying ? <Pause /> : <Play className="text-black"/>}
              </button>
              <button className="text-white" onClick={nextSong}>
                <NextSong />
              </button>
            </div>
            <SongControl audio={audioRef} />
            <audio ref={audioRef} />
          </div>
        </div>

        <div className="hidden lg:grid place-content-center ">
          <VolumeControl />
        </div>
      </div>
      <div
        className={`w-full h-full z-50 justify-center items-center ${isThereSong ? "flex" : "hidden"}`}
      >
        <span className="text-lg underline">No estás reproduciendo ninguna canción</span>
      </div>
    </>
  );
}
