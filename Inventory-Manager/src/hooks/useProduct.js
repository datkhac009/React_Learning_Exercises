import { useState, useEffect } from "react";

export const useProduct = (url) => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abort = new AbortController();

    const getProduct = async () => {
      try {
        const res = await fetch(`${url.replace(/\/$/, "")}/products`, {
          signal: abort.signal,
        });
        setIsLoading(true);

        if (!res.ok) {
          throw new Error(`Không thể fetch dữ liệu: Status ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setProduct(data);
        setError(null);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch đã bị hủy bỏ");
        } else {
          setError(error.message);
          setProduct([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();

    return () => {
      abort.abort();
    };
  }, [url]);

  return { product, isLoading, error };
};
