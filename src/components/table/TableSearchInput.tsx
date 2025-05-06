import classNames from "classnames";
import { Search } from "lucide-react";
import { FC, useState } from "react";

export type TableSearchInputProps = {
  onSearch?: (value: string) => void;
};

export const TableSearchInput: FC<TableSearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-4 flex justify-center">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          className={classNames(
            "w-full",
            "input-sm",
            "pl-10",
            "pr-4",
            "py-2",
            "rounded-md",
            "border",
            "border-gray-300",
            "bg-transparent",
            "text-gray-800",
            "dark:text-gray-200",
            "dark:border-gray-700",
            "dark:focus:ring-0",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-gray-400",
            "focus:border-gray-400",
            "dark:focus:ring-gray-500",
            "dark:focus:border-gray-500"
          )}
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <button
        type="button"
        onClick={handleSearch}
        className={classNames(
          "ml-2",
          "px-2",
          "py-2",
          "btn",
          "btn-sm",
          "h-[36px]",
          "filter-reset",
          "border",
          "border-gray-300",
          "bg-transparent",
          "text-gray-800",
          "dark:text-gray-200",
          "dark:border-gray-700",
          "dark:focus:ring-0",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-gray-400",
          "focus:border-gray-400",
          "dark:focus:ring-gray-500",
          "dark:focus:border-gray-500"
        )}
      >
        <Search />
      </button>
    </div>
  );
};
