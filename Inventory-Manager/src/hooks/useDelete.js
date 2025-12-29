import { useState } from "react";

export const useDelete = (url) => {
  const [isDeleteting, setIsDeleteting] = useState(false);
  const [error, setError] = useState(null);

  async function DeleteProduct(id) {
    try {
      setIsDeleteting(true);
      const res = await fetch(`${url.replace(/\/$/, "")}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(`Cannot delete product: ${res.status}, ${msg}`);
      }
      return true;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsDeleteting(false);
    }
  }

  return { DeleteProduct, isDeleteting, error };
};
