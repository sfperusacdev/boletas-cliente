import { useCallback, useEffect, useState } from "react";
import { ContextMenuContext, ContextMenuItem, ContextMenuState } from "./context";

export const ContextMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    items: [],
  });

  const openContextMenu = useCallback(
    <T,>(e: React.MouseEvent | React.TouchEvent, items: ContextMenuItem<T>[], data: T) => {
      e.preventDefault();

      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const padding = 10;
      const menuWidth = 180;
      const menuHeight = 200;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = clientX;
      let y = clientY;

      if (clientX + menuWidth + padding > viewportWidth) {
        x = viewportWidth - menuWidth - padding;
      }
      if (clientY + menuHeight + padding > viewportHeight) {
        y = viewportHeight - menuHeight - padding;
      }

      setState({
        isOpen: true,
        x,
        y,
        items: items as ContextMenuItem[],
        data,
      });
    },
    []
  );

  const closeContextMenu = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    const handleClick = () => {
      closeContextMenu();
    };
    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleClick);
    };
  }, [closeContextMenu]);

  return (
    <ContextMenuContext.Provider value={{ openContextMenu, closeContextMenu, state }}>
      {children}
      {state.isOpen && (
        <div
          className="absolute  min-w-[180px] rounded-md shadow-md border border-base-300 bg-base-100 text-base-content z-50 overflow-hidden"
          style={{ top: state.y, left: state.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {state.items.map((item, index) => {
            const IconComponent = item.icon;
            const isDisabled = item.disabled;

            return (
              <button
                key={index}
                onClick={() => {
                  if (!isDisabled) item.onClick(state.data);
                  closeContextMenu();
                }}
                className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${
                  isDisabled ? "cursor-not-allowed text-base-content/50 hover:bg-transparent" : "hover:bg-base-200"
                }`}
                disabled={isDisabled}
              >
                {IconComponent && <IconComponent className={`w-4 h-4 ${isDisabled ? "opacity-50" : ""}`} />}
                <span className="select-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </ContextMenuContext.Provider>
  );
};
