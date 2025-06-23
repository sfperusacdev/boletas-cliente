import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  RowSelectionState,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableError } from "./TableError";
import { TableBody } from "./TableBody";
import { ContextMenuItem } from "../../context/context-menu/context";

export type TableCoreProps<T> = {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  loading?: boolean;
  error?: string | Error | null;
  rowSelectionEnabled?: boolean;
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  getRowId?: (row: T) => string;
  onRetry?: () => void;
  contextMenuAcctions?:
    | ContextMenuItem<T>[]
    | ((row: T) => ContextMenuItem<T>[]);
};

export function TableCore<T>({
  data,
  columns,
  loading = false,
  error,
  rowSelectionEnabled = false,
  onRowClick,
  onRowDoubleClick,
  getRowId,
  onRetry,
  contextMenuAcctions,
}: TableCoreProps<T>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      rowSelection,
    },
    enableRowSelection: rowSelectionEnabled,
    getRowId: getRowId ? row => getRowId(row) : undefined,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div
      className={classNames(
        "overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-md shadow-lg",
      )}
    >
      <table className="w-full table-auto text-sm text-gray-700 dark:text-gray-300">
        <TableHeader table={table} />
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-gray-500 dark:text-gray-400"
              >
                Cargando...
              </td>
            </tr>
          ) : error ? (
            <TableError error={error} onRetry={onRetry} columns={columns} />
          ) : (
            <TableBody
              table={table}
              onRowClick={onRowClick}
              onRowDoubleClick={onRowDoubleClick}
              contextMenuAcctions={contextMenuAcctions}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
