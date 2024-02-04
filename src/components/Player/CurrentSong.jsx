function CurrentSong({ cover, title, proprietors }) {
  return (
    <div
      className={`
        flex items-center gap-5 relative
        overflow-hidden
      `}
    >
      <picture className="w-14 h-14 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={cover} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">{proprietors?.join(", ")}</span>
      </div>
    </div>
  );
}

export default CurrentSong