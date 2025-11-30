import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// MetaMask ve diğer wallet extension hatalarını engelle
if (typeof window !== "undefined") {
  // MetaMask hatalarını yakala ve sessizce yok say
  const originalError = window.console.error;
  window.console.error = (...args: any[]) => {
    const errorMessage = args.join(" ");
    // MetaMask ile ilgili hataları filtrele
    if (
      errorMessage.includes("MetaMask") ||
      errorMessage.includes("metamask") ||
      errorMessage.includes("ethereum") ||
      errorMessage.includes("wallet") ||
      errorMessage.includes("Cannot connect to MetaMask")
    ) {
      // Bu hataları sessizce yok say
      return;
    }
    // Diğer hataları normal şekilde göster
    originalError.apply(console, args);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
