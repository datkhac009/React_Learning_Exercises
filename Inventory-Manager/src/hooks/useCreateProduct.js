import { useState } from "react";

export const useCreateProduct = (url) => {
  console.log(url)
  const [isCreating, setIsCreateting] = useState(false);
  const [error, setError] = useState(null);

  async function CreateProduct(newData) {
    console.log("value",newData)
    try {
      setError(null);
      setIsCreateting(true);
      //fetch add vào db.json
      const baseurl = `${url.replace(/\/$/, "")}/products`;
      const res = await fetch(baseurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!res.ok) {
        throw new Error(`Cannot create product: ${res.status}`);
      }
      const {created} = res.json();
      return created;
    } catch (error) {
      setError(error);
    } finally {
      setIsCreateting(false);
    }
  }
  return { isCreating, error, CreateProduct };
};
