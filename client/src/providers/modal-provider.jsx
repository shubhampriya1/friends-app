import { useState, createContext } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Create the context
export const ModalContext = createContext({
  open: false,
  setOpen: () => {},
  setContent: () => {},
});

// ModalProvider component to provide modal context
function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Default Title",
    description: "Default Description",
  });

  // Set content function to update modal content dynamically
  const setContent = (title, htmlContent) => {
    setModalContent({ title, htmlContent });
    setOpen(true); // Automatically open modal when content is set
  };

  return (
    <ModalContext.Provider value={{ open, setOpen, setContent }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalContent.title}</DialogTitle>
            <DialogDescription
              dangerouslySetInnerHTML={{ __html: modalContent.htmlContent }}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
}

// Prop validation for the ModalProvider
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
