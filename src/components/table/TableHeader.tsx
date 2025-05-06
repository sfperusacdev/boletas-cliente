import { Table } from "@tanstack/react-table";
import classNames from "classnames";

export const TableHeader = <T,>({ table }: { table: Table<T> }) => {
  return (
    <thead className="bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={classNames(
                "px-4 py-3 font-semibold text-xs text-gray-600 dark:text-gray-200 uppercase tracking-wider",
                {
                  "text-left": header.column.id !== "actions",
                  "text-center": header.column.id === "actions",
                  "text-right": ["amount", "price"].includes(header.column.id),
                }
              )}
            >
              {header.isPlaceholder
                ? null
                : typeof header.column.columnDef.header === "string"
                ? header.column.columnDef.header
                : header.column.columnDef.header?.(header.getContext())}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
