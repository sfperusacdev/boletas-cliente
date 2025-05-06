import { useContext } from "react";
import { ConfirmModalContext } from "../context/confirm-modal/context";

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error("useModal debe ser usado dentro de un ModalProvider");
  }
  return context;
};
