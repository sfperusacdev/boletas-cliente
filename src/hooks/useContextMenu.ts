import { useContext } from "react";
import { ContextMenuContext } from "../context/context-menu/context";

export const useContextMenu = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx)
    throw new Error("useContextMenu must be used inside ContextMenuProvider");
  return ctx;
};
