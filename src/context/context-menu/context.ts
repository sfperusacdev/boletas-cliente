import { createContext, RefAttributes, ForwardRefExoticComponent } from "react";
import { LucideProps } from "lucide-react";

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export type ContextMenuItem<T = unknown> = {
  label: string;
  icon?: Icon;
  disabled?: boolean;
  onClick: (data: T) => void;
};

export type ContextMenuState<T = unknown> = {
  isOpen: boolean;
  x: number;
  y: number;
  items: ContextMenuItem<T>[];
  data?: T;
};

export const ContextMenuContext = createContext<{
  openContextMenu: <T>(e: React.MouseEvent | React.TouchEvent, items: ContextMenuItem<T>[], data: T) => void;
  closeContextMenu: () => void;
  state: ContextMenuState<unknown>;
} | null>(null);
