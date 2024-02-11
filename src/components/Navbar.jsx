import LeftArrow from "@/icons/Left_arrow";
import RightArrow from "@/icons/Right_arrow";

function Navbar() {
  const previousPage = () => window.history.back();
  const nextPage = () => window.history.forward();
  return (
    <nav className="flex pt-2 px-4 absolute z-50 bg-transparent">
      <button
        className="ml-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-150"
        onClick={previousPage}
      >
        <LeftArrow />
      </button>
      <button
        className="ml-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-150"
        onClick={nextPage}
      >
        <RightArrow />
      </button>
    </nav>
  );
}

export default Navbar;
