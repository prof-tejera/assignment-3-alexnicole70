import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
  <App />
  </ErrorBoundary>
  // </StrictMode>
);
