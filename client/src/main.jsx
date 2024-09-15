import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./providers/auth-provider.jsx";
import { ThemeProvider } from "./providers/theme-provider.jsx";
import ModalProvider from "./providers/modal-provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
        <Toaster richColors duration={2000} closeButton position="top-center" />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
