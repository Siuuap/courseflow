import MagnifyingIcon from "@/assets/images/icons/magnifying.svg";
import Image from "next/image";

function SearchBox({ search, onSearch }) {
  return (
    <div className="flex self-center flex-col relative mt-10 ">
      <input
        type="text"
        id="search-box"
        placeholder="Search..."
        className="max-w-350 self-center rounded-md  border border-
          [#CCD0D7] border-solid p-[8px] pl-[50px] w-[357px]"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <Image
        src={MagnifyingIcon}
        alt="magnifying icon"
        className=" absolute top-[9px] left-[13px]"
      />
    </div>
  );
}

export default SearchBox;
