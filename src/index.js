import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import "./index.css";
import { deltaruneTheme } from "./theme/deltaruneTheme";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={deltaruneTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);