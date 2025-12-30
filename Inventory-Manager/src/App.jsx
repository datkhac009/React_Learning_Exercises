import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useState, useMemo, useCallback } from "react";
import { ThemeProvider } from "@emotion/react";
import { themeDark, themeLight } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { useProduct } from "./hooks/useProduct";
import { createRouter } from "./router";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { isLoading, product, refetchdata, error } = useProduct(API_BASE_URL);

  // Memoize
  const theme = useMemo(() => (darkMode ? themeDark : themeLight), [darkMode]);

  // Memoize callbacks để tránh re-render
  const handleDarkModeToggle = useCallback((value) => {
    setDarkMode(value);
  }, []);

  // Router với dependencies 
  const router = useMemo(
    () =>
      createRouter({
        darkMode,
        setDarkMode: handleDarkModeToggle,
        refetchdata,
        error,
        isLoading,
        product,
      }),
    [darkMode, handleDarkModeToggle, refetchdata, error, isLoading, product]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
