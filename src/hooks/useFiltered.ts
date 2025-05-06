import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { searchAndFilterData } from "../utils/search";

export const useFilterData = <T>(data: T[] | undefined): [T[], Dispatch<SetStateAction<string>>] => {
  const [search, setSearchValue] = useState("");
  const filteredData = useMemo<T[]>(() => {
    if (!data || !search.trim()) return data ?? [];
    const sections = search
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    return sections.reduce<T[]>((acc, s) => searchAndFilterData(acc, s), data);
  }, [data, search]);
  return [filteredData, setSearchValue];
};
