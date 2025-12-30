import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import ListProduct from "../modules/product/ListProduct";

export const createRouter = ({ darkMode, setDarkMode, refetchdata, error, isLoading, product }) => {
  return createBrowserRouter([
    {
      path: "/",
      element: (
        <Mainlayout
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          refetchdata={refetchdata}
          error={error}
          isLoading={isLoading}
        />
      ),
      children: [
        {
          index: true,
          element: (
            <ListProduct
              product={product}
              isLoading={isLoading}
              refetchdata={refetchdata}
            />
          ),
        },
      ],
    },
  ]);
};
