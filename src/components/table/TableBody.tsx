import { flexRender, Table } from "@tanstack/react-table";
import classNames from "classnames";
import { useContextMenu } from "../../hooks/useContextMenu";
import { ContextMenuItem } from "../../context/context-menu/context";
import { useRef, useState } from "react";

type Props<T> = {
  table: Table<T>;
  onRowClick?: (row: T) => void;
  onRowDoubleClick?: (row: T) => void;
  contextMenuAcctions?: ContextMenuItem<T>[] | ((row: T) => ContextMenuItem<T>[]);
};

export function TableBody<T>({ table, onRowClick, onRowDoubleClick, contextMenuAcctions }: Props<T>) {
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openContextMenu } = useContextMenu();

  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);

  const openContextMenuTrigger = (row: T, rowId: string) => {
    return (e: React.MouseEvent | React.TouchEvent) => {
      if (contextMenuAcctions == null) return;
      let items: ContextMenuItem<T>[] = [];
      if (typeof contextMenuAcctions === "function") {
        items = contextMenuAcctions(row);
      } else {
        items = contextMenuAcctions;
      }
      if (items.length === 0) return;

      setFocusedRowId(rowId);
      openContextMenu(e, items, row);
    };
  };

  return (
    <>
      {table.getRowModel().rows.map((row) => {
        const rowId = row.id;

        return (
          <tr
            key={rowId}
            onClick={() => {
              setFocusedRowId(rowId);
              onRowClick?.(row.original);
            }}
            onDoubleClick={() => onRowDoubleClick?.(row.original)}
            className={classNames(
              "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 relative",
              {
                "bg-primary/10 dark:bg-primary/20": row.getIsSelected(),
                "bg-primary/5 dark:bg-primary/10": focusedRowId === rowId && !row.getIsSelected(),
                "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-1 after:bg-primary":
                  focusedRowId === rowId,
              }
            )}
            onContextMenu={(evnt) => openContextMenuTrigger(row.original, rowId)(evnt)}
            onTouchStart={(evnt) => {
              touchTimeoutRef.current = setTimeout(() => {
                openContextMenuTrigger(row.original, rowId)(evnt);
              }, 500);
            }}
            onTouchEnd={() => {
              if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={classNames(
                  "px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700",
                  "select-none",
                  {
                    "text-left": cell.column.id !== "actions",
                    "text-center": cell.column.id === "actions",
                    "text-right": ["amount", "price"].includes(cell.column.id),
                  }
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        );
      })}
    </>
  );
}
