import { ModalContext } from "@/providers/modal-provider";
import { useContext } from "react";

export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error("useModal must be used within a AuthProvider");

  return context;
}
