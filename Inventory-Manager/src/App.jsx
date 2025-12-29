import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Mainlayout from "../src/layouts/Mainlayout";
import CreateItemProduct from "./modules/product/CreateItemProduct";
import ListProduct from "./modules/product/ListProduct";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { themeDark, themeLight } from "./theme/theme";
import { CssBaseline } from "@mui/material";
import { useProduct } from "./hooks/useProduct";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const {isLoading, product, refetchdata, error } = useProduct(API_BASE_URL);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout darkMode={darkMode} setDarkMode={setDarkMode} refetchdata={refetchdata}  error={error} isLoading={isLoading}/>,
      children: [
        {
          index: true,
          element: <ListProduct product={product}
              isLoading={isLoading}
              refetchdata={refetchdata}/>,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : themeLight}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
