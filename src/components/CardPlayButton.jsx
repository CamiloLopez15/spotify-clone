import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export default function CardPlayButton({ id }) {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const handleClic = () => {
    if (isPlayingPlayList) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;

        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });

        console.log({songs, playlist})
      });
  // console.log(id)
  };

  const isPlayingPlayList = isPlaying && currentMusic?.playlist.id === id;

  return (
    <button
      className="card-play-button rounded-full bg-green-500 p-4"
      onClick={handleClic}
    >
      {isPlayingPlayList ? <Pause /> : <Play />}
    </button>
  );
}
