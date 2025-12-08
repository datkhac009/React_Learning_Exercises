import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Mainlayout from "../src/layouts/Mainlayout";
import Header from "./components/Header";
import CreateItemProduct from "./modules/product/CreateItemProduct";
import ListProduct from "./modules/product/ListProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout />,
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

  return <RouterProvider router={router} />;
}

export default App;
