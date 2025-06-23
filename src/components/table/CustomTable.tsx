import { Pager, PagerProps } from "./Pager";
import { TableCore, TableCoreProps } from "./TableCore";
import { TableSearchInput } from "./TableSearchInput";

type CustomTableProps<T> = {
  title?: string;
  pageProps?: PagerProps;
  onSearch?: (value: string) => void;
} & TableCoreProps<T>;

export const CustomTable = <T,>(props: CustomTableProps<T>) => {
  return (
    <div className="relative">
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {props.title && (
            <h2 className="text-2xl font-semibold">{props.title}</h2>
          )}
          {props.onSearch && <TableSearchInput onSearch={props.onSearch} />}
        </div>
      </div>
      <TableCore {...props} />
      {props.pageProps && (
        <div className="flex justify-end">
          <Pager
            initialLimit={props.pageProps.initialLimit}
            initialOffset={props.pageProps.initialOffset}
            total={props.pageProps.total}
            onUpdate={props.pageProps.onUpdate}
          />
        </div>
      )}
    </div>
  );
};
