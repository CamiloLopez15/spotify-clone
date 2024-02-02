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
import { useEffect, useRef } from "react";

export function Player() {
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying, volume } =
    usePlayerStore((state) => state);

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
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
      audioRef.current.addEventListener("ended", nextSong);
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const idNextSong = currentMusic.song.id;
    console.log(currentMusic.song.id, idNextSong);
    if (idNextSong === currentMusic.songs.length) {
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
    const idPreviousSong = currentMusic.song.id - 2;
    console.log(currentMusic.song.id, idPreviousSong);
    if (
      idPreviousSong < 0 ||
      idPreviousSong === currentMusic.songs.length - 1
    ) {
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
        className={`flex-row justify-between w-full h-full px-1 z-50 ${
          isThereSong ? "hidden" : "flex"
        }`}
      >
        <div className="w-[200px]">
          <CurrentSong {...currentMusic.song} />
        </div>

        <div className="grid place-content-center gap-4 flex-1">
          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-evenly w-[30%]">
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

        <div className="grid place-content-center">
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
