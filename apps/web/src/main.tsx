// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./pages/App.js";

import "antd/dist/reset.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
