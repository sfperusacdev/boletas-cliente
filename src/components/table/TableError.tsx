import { ColumnDef } from "@tanstack/react-table";

export const TableError = <T,>({
  error,
  onRetry,
  columns,
}: {
  error: string | Error;
  onRetry?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
}) => {
  return (
    <tr>
      <td colSpan={columns.length} className="p-6 text-center text-red-500 dark:text-red-400">
        <div>{typeof error === "string" ? error : error.message}</div>
        {onRetry && (
          <button onClick={onRetry} className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80">
            Intentar nuevamente
          </button>
        )}
      </td>
    </tr>
  );
};
