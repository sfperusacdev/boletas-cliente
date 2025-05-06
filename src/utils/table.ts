import { ColumnDef, ColumnHelper, createColumnHelper } from "@tanstack/react-table";

export const buildTableColumns = <T>(builder: (_helper: ColumnHelper<T>) => ColumnDef<T, string>[]) => {
  const columnHelper = createColumnHelper<T>();
  return builder(columnHelper);
};
