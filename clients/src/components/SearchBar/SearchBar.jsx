import React from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchBar = ({ value, onChange, placeholder = "Search notes..." }) => {
  return (
    <div className="relative">
      <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-dark w-full pl-10 pr-4 py-2.5 text-sm"
        aria-label="Search notes"
      />
    </div>
  );
};

export default SearchBar;
