function SearchBox({ search, onSearch }) {
    return (
      <div className="flex self-center flex-col relative">
        <input
          type="text"
          id="search-box"
          placeholder="Search..."
          className="max-w-50 self-center mt-10 rounded-md h-10 border border-
          [#CCD0D7] border-solid p-[20]  text-center"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <i>
          <img
            src="icons/magnifying.png"
            className=" absolute top-[50px] left-[13px]"
          />
        </i>
      </div>
    );
  }

  export default SearchBox