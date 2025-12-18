import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Mainlayout from "../src/layouts/Mainlayout";
import CreateItemProduct from "./modules/product/CreateItemProduct";
import ListProduct from "./modules/product/ListProduct";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { themeDark, themeLight } from "./theme/theme";
import { CssBaseline } from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout darkMode={darkMode} setDarkMode={setDarkMode} />,
      children: [
        {
          index: true,
          element: <ListProduct />,
        },
        {
          path: "/listitem",
          element: <ListProduct />,
        },
        {
          path: "/create",
          element: <CreateItemProduct />,
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
