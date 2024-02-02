import Play from "@/icons/Play";
import { usePlayerStore } from "@/store/playerStore";

function MusicTableElements({ song, index }) {
  const { setCurrentMusic, setIsPlaying } = usePlayerStore((state) => state);
  const onClickTr = () => {
    fetch(`/api/get-info-playlist.json?id=${song.albumId}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        const songId = song.id - 1;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[songId] });
        console.log({ songs, playlist, song: songs[songId] });
      });
  };
  return (
    <button
      className="grid grid-cols-[4%_50%_32%_14%] grid-rows-1 row-span-1 col-span-4 min-w-full text-left items-center hover:bg-white/10 rounded-lg group"
      onClick={onClickTr}
    >
      <div className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
        <span className="group-hover:hidden">{index + 1}</span>
        <Play className="hidden group-hover:block text-white" />
      </div>
      <div className="px-4 py-2 flex gap-3">
        <picture className="">
          <img src={song.image} alt={song.title} className="w-11 h-11" />
        </picture>
        <div className="flex flex-col">
          <h3 className="text-white text-base font-normal">{song.title}</h3>
          <span>{song.artists.join(", ")}</span>
        </div>
      </div>
      <span className="px-4 py-2">{song.album}</span>
      <span className="px-4 py-2 rounded-tr-lg rounded-br-lg">
        {song.duration}
      </span>
    </button>
  );
}

export default MusicTableElements;
