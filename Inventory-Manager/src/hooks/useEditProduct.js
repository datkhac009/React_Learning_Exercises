import { useState } from "react";

export const useEditProduct = (url) => {
  const [isEditting, setIsEditting] = useState(false);
  const [error, setError] = useState(null);
  const baseurl = `${url.replace(/\/$/, "")}/products`;

  async function editProduct(id, UpdateData) {
    try {
      setIsEditting(true);
      setError(null);
      const res = await fetch(`${baseurl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateData),
      });
      if (!res.ok) {
        throw new Error("Error Update");
      }
      const update = await res.json();
      return update;
    } catch (error) {
      setError(error);
      throw error;

    } finally {
      setIsEditting(false);
    }
  }

  return { editProduct, isEditting, error };
};
